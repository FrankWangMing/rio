import GUI from 'lil-gui';

import {
  AttributeFrames,
  core,
  JsonLoader,
  LayerParams,
  LineMaterial,
  LineMesh,
  LineSegmentsGeometry,
  mapboxgl,
  MapLayerBase,
  RaycastMap,
} from 'ys-dte';
console.log(core.ShaderLib['line'].uniforms);

// import { LineMesh } from "./line";
// import { LineMaterial } from "./line";
import { Line2Frame } from './line2Frame';
interface LineData {
  chanelName: string;
  lnglat: number[];
  points: number[];
  ids: number[];
  features: mapboxgl.LonLatLike[];
  frames: AttributeFrames[];
  colorList?: number[]; // [0x000000, 0x0000ff, 0x00ff00, 0xff0000,  0xffffff],
  barValue?: number[]; // [0, .3,.5, .8, 1],
}

export interface PickData {
  attributeName: string;
  name: string;
  value: number;
  ids: number[];
  factor: number;
  frameIndex: number;
  timestamp: number;
  values: { value: number; time: string }[];
}
interface SingleLineParams {
  autoplay?: boolean;
  duration?: number;
  linewidth?: number;
  pickLinewidth?: number;
  attributeName?: string;
  frameBuffer: core.WebGLRenderTarget; // 各自维护，这样就可以知道拾取的是哪个渠道，缺点就是要多绘制n次
  //   应该由外层统一更新
  cw?: number;
  ch?: number;
  mouse?: { x: number; y: number };
  lineData: LineData; // 处理好的数据
}

export class SingleLineLayer extends MapLayerBase {
  raycaster: RaycastMap;
  frameIndex = 0;
  autoplay = true;
  /** 默认为1fps*/
  duration = 1000;
  colorStep = 1; // 颜色id的间隔
  linewidth = 2;
  pickLinewidth = 0; //扩大拾取范围  慎重使用
  attributeName = 'v';
  frameBuffer = new core.WebGLRenderTarget(1, 1, {
    type: core.IntType,
    format: core.RGBAIntegerFormat,
    // internalFormat: 'RGBA32I',
  });
  GPUSelect = false;
  cw = 0;
  ch = 0;
  mouse = { x: 0, y: 0 };
  needRead = false; // 仅demo 用于测试
  pixelBuffer = new Uint8Array(4);
  line: Line2Frame;
  jsonLoader: JsonLoader;
  lineFrameGroups: Line2Frame[] = [];
  gui = new GUI({ autoPlace: false });
  guiOptions: { [key: string]: any };
  viewChanged = true; // 视图是否变化了
  currentValue = 0;
  lineGuiController: any; // 仅demo 用于同步gui显示
  PhysicalValGuiController: any; // 仅demo 用于同步gui显示
  lineData: LineData;
  frameTotal: any;
  frameController: any; // 仅demo 用于同步gui显示
  mapCenter: number[];
  /**外部监听动画播放 */
  onFrameChange = (index: number) => {};
  colorAttr: core.InstancedInterleavedBuffer;
  lineMesh: LineMesh;
  colorAttrStart: core.InterleavedBufferAttribute;
  colorAttrEnd: core.InterleavedBufferAttribute;
  constructor(Params: LayerParams, lineParams?: SingleLineParams) {
    super(Params);
    // this.line.visible = false
    this.mapCenter = this.params.center;
    this.updateSize(lineParams.cw, lineParams.ch);
    // this.renderer.setSize(this.cw, this.ch, true); //现在 onadd的resize 已经是正确的了
    this.raycaster = new RaycastMap(this.scene, this.camera, this.map);
    this.raycaster.raycaster.camera = this.camera;
    lineParams && this.initLineParams(lineParams);

    this.createLines(lineParams.lineData);
    this.initEvents();
  }
  initLineParams(lineParams: SingleLineParams) {
    Object.assign(this, lineParams);
  }
  mapMousedown(ev?: mapboxgl.MapEventType) {
    // throw new Error("Method not implemented.");
  }
  childResize(clientWidth: number, clientHeight: number) {}

  async mapMouseup(ev: mapboxgl.MapEventType) {}
  async mapWheel(ev: mapboxgl.MapEventType) {}
  init() {
    this.jsonLoader = new JsonLoader();
    this.renderer.localClippingEnabled = true;
  }
  //  用处理好的数据构建线条
  createLines(data: LineData) {
    let MinMax;
    let canvas = this.map.getCanvas();
    let { clientWidth, clientHeight } = canvas;
    this.lineData = data;
    MinMax = data.frames[0].MinMax;
    const lf = new Line2Frame(
      data.frames,
      {
        name: this.attributeName,
        linewidth: this.linewidth,
        alphaToCoverage: false,
        MinValue: MinMax[this.attributeName].MinValue,
        MaxValue: MinMax[this.attributeName].MaxValue,
        colorList: data.colorList,
        barValue: data.barValue,

        // colorList: [0x000000, 0x0000ff, 0x00ff00, 0xff0000,  0xffffff],
        // barValue: [0, .3,.5, .8, 1],

        worldUnits: false, //  目前开启之后 线宽1000  0.01 都看不见
      },
      clientWidth,
      clientHeight,
    );

    let { geometry, material } = lf.lineMesh;
    geometry.setAttribute(
      'lnglat',
      new core.Float32BufferAttribute(data.lnglat, 3),
    );
    geometry.setAttribute(
      'pos',
      new core.Float32BufferAttribute(data.points, 3),
    );
    //  points是原始数据  如果点数超出 16777215 那么此法不可用

    const len = data.points.length / 3;
    this.colorStep = (0xffffff / len) | 0;
    if (!this.colorStep) throw new Error('颜色ID超出范围');
    const color: number[] = [];
    for (let ind = 0; ind < len; ind++) {
      const is = ind * this.colorStep;
      const rs = ((is >> 16) & 255) / 255;
      const gs = ((is >> 8) & 255) / 255;
      const bs = (is & 255) / 255;
      color.push(rs, gs, bs);

      if (ind < len - 1) {
        const ie = (ind + 1) * this.colorStep;
        const re = ((ie >> 16) & 255) / 255;
        const ge = ((ie >> 8) & 255) / 255;
        const be = (ie & 255) / 255;
        color.push(re, ge, be);
      }
    }

    const instanceColorBuffer = new core.InstancedInterleavedBuffer(
      new Float32Array(color),
      6,
      1,
    );
    this.colorAttrStart = new core.InterleavedBufferAttribute(
      instanceColorBuffer,
      3,
      0,
    );
    this.colorAttrEnd = new core.InterleavedBufferAttribute(
      instanceColorBuffer,
      3,
      3,
    );

    //以备后用
    this.line = lf;
    this.lineMesh = lf.lineMesh;
    this.lineMesh.name = data.chanelName;
    this.lineFrameGroups.push(lf);
    this.scene.add(this.lineMesh);
    // attrbute都传进去  用一个uniform来控制是否启用颜色id
    this.lineMesh.geometry.setAttribute(
      'instanceColorIDStart',
      this.colorAttrStart,
    );
    this.lineMesh.geometry.setAttribute(
      'instanceColorIDEnd',
      this.colorAttrEnd,
    );
  }

  mapRender(
    gl: WebGLRenderingContext,
    matrix: number[],
    l: THREE.Matrix4,
    camera: number[],
  ): void {
    this.raycaster && this.raycaster.render(gl, matrix, l);
    this.renderer && this.renderer.render(this.scene, this.camera);
  }

  initEvents() {

  }
  updateLineWidth(w: number) {
    const material = this.lineMesh.material;
    material.linewidth = w;
  }

  initGui() {
    const options = {
      linewidth: this.linewidth,
      alphaToCoverage: true,
      dashed: false,
      showMapLine: false,
      播放速度: 6000_0 / this.duration,
      attributeName: this.attributeName,
      '暂停/继续': () => {
        this.autoplay = !this.autoplay;
      },
      物理量拾取: this.GPUSelect,
      currentValue: 0,
      frameIndex: this.frameIndex,
      go: () => {
        this.autoplay = false;
        this.frameController.setValue(this.frameIndex + 1);
      },
      back: () => {
        this.frameController.setValue(this.frameIndex + 1);
        this.autoplay = false;
      },
    };
    this.guiOptions = options;

    this.lineGuiController = this.gui
      .add(options, 'linewidth', 0, 30, 1)
      .onChange((w: number) => {
        this.updateLineWidth(w);
      });

    this.gui
      .add(options, 'attributeName', ['v', 'wl', 'h', 'q', 'position'])
      .onChange((attr: string) => {
        this.attributeName = attr;
        this.lineFrameGroups.forEach((item) => {
          const line = item.lineMesh;
          line.setAttributeName(attr);
        });
      });
    this.gui.add(options, '暂停/继续');
    this.gui.add(options, 'go').name('下一帧');
    this.gui.add(options, 'back').name('上一帧');
    this.frameController = this.gui
      .add(options, 'frameIndex', 0, this.frameTotal - 1, 1)
      .name('指定帧')
      .onChange((v: number) => {
        this.goto(v);
        this.frameIndex = v;
      });

    this.gui.add(options, '物理量拾取').onChange((v: boolean) => {
      this.GPUSelect = v;
    });
    this.gui.add(options, '播放速度', 1, 1000, 10).onChange((v: number) => {
      this.duration = 6000_0 / v;
    });

    this.PhysicalValGuiController = this.gui
      .add(options, 'currentValue')
      .name('物理量');
  }
  setAttributeName(attr: string) {
    this.attributeName = attr;
    this.lineMesh.setAttributeName(attr);
  }
  setColor(colorMap: [number, core.ColorRepresentation][]) {
    this.lineMesh.setColor(colorMap);
  }
  updateGPU(viewChanged = false) {
    if (!viewChanged) return;
    /*按顶点顺序使用颜色id,*/
    // const geo = this.lineMesh.geometry;
    // const starColorAttr = geo.getAttribute("instanceColorStart");
    // const endColorAttr = geo.getAttribute("instanceColorStart");
    // geo.setAttribute(
    //   "instanceColorStart",
    //   new core.InterleavedBufferAttribute(this.colorAttr, 3, 0)
    // ); // rgb
    // geo.setAttribute(
    //   "instanceColorEnd",
    //   new core.InterleavedBufferAttribute(this.colorAttr, 3, 3)
    // );

    if (this.pickLinewidth > this.linewidth) {
      this.updateLineWidth(this.pickLinewidth);
    }
    let origin = this.renderer.getRenderTarget();
    this.frameBuffer.setSize(this.cw, this.ch);

    (this.lineMesh.material as LineMaterial).usecolorId = 1;
    this.renderer.setRenderTarget(this.frameBuffer);
    this.renderer.clear();

    this.renderer.render(this.scene, this.camera);
    (this.lineMesh.material as LineMaterial).usecolorId = 0;

    this.updateLineWidth(this.linewidth);

    /* this.pixelBuffer = new Uint8Array(4 * this.cw * this.ch);
   this.renderer.readRenderTargetPixels(this.frameBuffer,0,0,this.cw,this.ch,this.pixelBuffer)
    const imageData = new ImageData(
      this.cw,
      this.ch
    );
    imageData.data.set(this.pixelBuffer);
    helpers.saveImage(imageData,this.id, true);*/

    this.renderer.setRenderTarget(origin);
  }
  framePause() {
    this.autoplay = false;
  }

  frameResume() {
    this.autoplay = true;
  }
  updateSize(w: number, h: number) {
    this.cw = w;
    this.ch = h;
    this.line && this.line.resize(w, h);
  }
  readPixels() {
    const gl = this.renderer.getContext();
    // gl.bindFramebuffer(gl.FRAMEBUFFER, );
    const res = new Uint8Array(4);
    gl.readPixels(
      this.mouse.x,
      this.ch - this.mouse.y,
      1,
      1,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      res,
    );
    res[3] && console.log(res);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return res;
  }
  getInfoByEV(
    ev: { x: number; y: number },
    updateGPU = false,
  ): PickData | void {
    if (!this.pixelBuffer) {
      return;
    }
    /*
         const intersects =this.raycaster.getIntersection(new core.Vector2(ev.x, ev.y));
         console.log(intersects);
    */
    this.mouse.x = ev.x;
    this.mouse.y = ev.y;
    this.updateGPU(updateGPU);
    this.renderer.readRenderTargetPixels(
      this.frameBuffer,
      ev.x,
      this.ch - ev.y,
      1,
      1,
      this.pixelBuffer,
    );

    let index = 0;
    const r = this.pixelBuffer[index];
    const g = this.pixelBuffer[index + 1];
    const b = this.pixelBuffer[index + 2];
    const a = this.pixelBuffer[index + 3];
    // console.log(r,g, b,a);
    if (a) {
      console.log('选中水道');
      let color = (r << 16) | (g << 8) | b;
      let pointInd = color / this.colorStep;
      let startInd = Math.floor(pointInd);
      let endInd = Math.ceil(pointInd);
      let f = pointInd - startInd;
      let startValue =
        this.lineData.frames[this.frameIndex].attributes[this.attributeName]
          .array[startInd];
      let endValue =
        this.lineData.frames[this.frameIndex].attributes[this.attributeName]
          .array[endInd];
      let resultvalue = startValue * (1 - f) + endValue * f; // (end-start) * f + start
      const values = [];
      for (
        let frameInd = 0;
        frameInd < this.lineData.frames.length;
        frameInd++
      ) {
        const { time, timestamp, attributes } = this.lineData.frames[frameInd];
        const attrArray = attributes[this.attributeName].array;
        values.push({
          time,
          timestamp,
          value: attrArray[startInd] * (1 - f) + attrArray[endInd] * f,
        });
      }
      if (Number.isNaN(resultvalue)) {
        debugger;
        let rev = startValue * (1 - f) + endValue * f;
      }
      const ids = [this.lineData.ids[startInd], this.lineData.ids[endInd]];
      // console.log(startInd, endInd, f, resultvalue,this.lineData.chanelName);
      return {
        ids,
        frameIndex: this.frameIndex,
        timestamp: this.lineData.frames[this.frameIndex].timestamp,
        factor: f,
        attributeName: this.attributeName,
        name: this.lineMesh.name,
        value: resultvalue,
        values,
      };
    }
  }
  goto(frameIndex = this.frameIndex) {
    const frame = this.lineData.frames[frameIndex];
    if (frame) {
      const line = this.lineMesh;
      // 强制更新
      line.buffer.attributes = {
        ...line.buffer.attributes,
        ...frame.attributes,
      };
      line.setAttributeName(this.attributeName, true);
    }
    this.frameIndex = frameIndex;

    this.onFrameChange(frameIndex);
  }
  goahead() {
    this.goto(++this.frameIndex);
  }
  back() {
    this.goto(--this.frameIndex);
  }
  // 更新高度以贴合地形 目前来说还是需要适当抬高看上去才好点儿，或者拉近的时候线宽调细些。
  updateBottom(offset = 10) {
    this.lineFrameGroups.forEach((lf: Line2Frame) => {
      const line = lf.lineMesh;
      let attrLnglat = line.geometry.getAttribute(
        'lnglat',
      ) as core.BufferAttribute;
      let attrPosition = line.geometry.getAttribute(
        'pos',
      ) as core.BufferAttribute;
      SingleLineLayer.updateAttributeByLnglat(
        attrLnglat,
        attrPosition,
        this.map,
        1,
        offset,
      );
      console.log(attrPosition);

      this.updatePosition(line.geometry, attrPosition.array);
    });
  }
  static updateAttributeByLnglat(
    attr_Lnglat: core.BufferAttribute,
    attr_Postion: core.BufferAttribute,
    map: mapboxgl.Map,
    bottomAmplitude: number,
    offset: number,
  ): boolean {
    if (!attr_Lnglat || !attr_Postion) {
      throw new Error('更新经纬度位置缺少必要参数');
    }
    if (attr_Postion.count !== attr_Lnglat.count) {
      throw new Error('经纬度校准文件无法匹配网格');
    }

    for (let k = 0; k < attr_Postion.count; k++) {
      let lngLat = new mapboxgl.LngLat(
        attr_Lnglat.array[k * 3],
        attr_Lnglat.array[k * 3 + 1],
      );
      let altitude = map.queryTerrainElevation(lngLat, {
        exaggerated: false,
      });
      altitude = altitude
        ? altitude * bottomAmplitude + offset
        : attr_Postion.array[k * 3 + 1];

      (attr_Postion.array as number[])[k * 3 + 1] = altitude;
    }
    attr_Postion.needsUpdate = true;

    return true;
  }

  updatePosition(geometry: LineSegmentsGeometry, array: ArrayLike<number>) {
    const length = array.length - 3;
    const points = new Float32Array(2 * length);

    for (let i = 0; i < length; i += 3) {
      points[2 * i] = array[i];
      points[2 * i + 1] = array[i + 1];
      points[2 * i + 2] = array[i + 2];

      points[2 * i + 3] = array[i + 3];
      points[2 * i + 4] = array[i + 4];
      points[2 * i + 5] = array[i + 5];
    }

    geometry.setPositions(points);
  }
 dispose(){

   this.map.removeLayer(this.id);
 }
  onRemove(map: Map, gl: WebGLRenderingContext): void {
    this.scene.clear();
    this.lineMesh.dispose();
    this.lineData = null;
    this.colorAttr = null;
    this.pixelBuffer = null;
    this.colorAttrEnd = null;
    this.colorAttrStart = null;
    // this.frameBuffer.dispose(); 外部dispose，公用的
  }


}
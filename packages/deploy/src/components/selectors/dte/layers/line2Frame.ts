import { AttributeFrames ,LineMesh, LineMeshParams, LineMaterial} from "ys-dte";

import GUI from "lil-gui";
/**
 * 这个文件将替换lineFrame  同时转移一些singlelinelayer的功能
 */

/**
 * 流线帧网格
 */
export interface LineFrameParams extends LineMeshParams {
  /** 渲染属性名称 */
  name: string;
}

/**
 * 流线帧线对象，单条线
 */
export class Line2Frame  {
  lineMesh: LineMesh ;
  lineMaterial: LineMaterial;
  frameIndex =0 ;
  onFrameChange: (frameIndex: number) => void;
  attributeName:''
  params: LineFrameParams = {
    name: "position",
    linewidth: 3,
    dashed: false,
    alphaToCoverage: true,
    colorList: [0x0000ff, 0x00ffff, 0x00ff00, 0xffff00, 0xff0000],
    barValue: [0, 0.25, 0.5, 0.75, 1],
    count: 512,
  };
  frames: AttributeFrames[];
  /**
   * 初始化
   * @param geometryList 数据帧数组
   * @param params 参数
   * @param width canvas宽度
   * @param height canvas高度
   */
  constructor(
    dataList: AttributeFrames[],
    params: LineFrameParams,
    width: number,
    height: number
  ) {


    this.lineMaterial = new LineMaterial({
      // color: 0xffffff,
      linewidth: this.params.linewidth || 8, // in world units with size attenuation, pixels otherwise
      vertexColors: true,
      //resolution:  // to be set by renderer, eventually
      dashed: this.params.dashed || false,
      alphaToCoverage: this.params.alphaToCoverage,
      transparent:true
    });
    this.setParams(params);
    this.init(dataList);

    if (width && height) {
      this.resize(width, height);
    }
  }

  private init(geometryList: AttributeFrames[]) {
    let _geometry = geometryList[0].geometry ;
    this.lineMesh = new LineMesh(
      _geometry,
      this.params.name,
      this.params,
      this.lineMaterial
    );
    this.frames = geometryList;
    this.frames.sort( (a,b)=>{  return a.timestamp - b.timestamp  })
  }
  //  首次对position的处理放在了lineMesh的的setData中，而且依赖indexes 这里按理说也应该用index才对
  // 目前的流线的点数都是会变的 这个方法的前提就是点数不变
  updatePosition( array: ArrayLike<number>) {
    const geometry = this.lineMesh.geometry ;
    const length = array.length - 3;
    const points = new Float32Array(2 * length);
//  这种更新方法的前提就是， index数组，是严格按照 0,1,1,2,2,3....n,n,n+1这样的 如果几何体的索引不是这样的，不如直接替换
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

  /**
   * 设置参数
   * @param params
   */
  setParams(params = this.params): Line2Frame {
    Object.assign(this.params, params);
    this.lineMaterial.linewidth = this.params.linewidth;
    this.lineMaterial.dashed = this.params.dashed;
    this.lineMaterial.alphaToCoverage =
      (this.params.alphaToCoverage || false) ?? true;
    this.lineMaterial.worldUnits = this.params.worldUnits;
    return this;
  }

  /**
   * canvas调整大小
   * @param clientWidth 宽
   * @param clientHeight 高
   */
  resize(clientWidth: number, clientHeight: number): Line2Frame {
    this.lineMaterial.resolution.set(clientWidth, clientHeight);
    return this;
  }
  goto(frameIndex = this.frameIndex) {
    const frame = this.frames[frameIndex];
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
  /**
   * 销毁帧网格组
   */
  dispose() {

    this.lineMesh.dispose();
  }

  /**
   * 创建gui
   * @param gui
   */
  createGUI(gui: GUI): GUI {
    if (!gui) return;
    let fold = gui.addFolder("line" + Math.ceil(Math.random() * 1000));

    fold.add(this.params, "linewidth", 1, 40, 0.5).onChange((val: number) => { this.lineMaterial.linewidth = val; });

    fold.add(this.params, "alphaToCoverage").onChange((val: boolean) => {this.lineMaterial.alphaToCoverage = val;});

    fold.add(this.params, "dashed").onChange((val: boolean) => {this.lineMaterial.dashed = val;});

    return fold;
  }
}
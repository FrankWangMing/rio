import GUI from "lil-gui";

import {
  core,
  JsonLoader,
  LayerParams,
  mapboxgl,
  AttributeFrames,
  RaycastMap,
  dte,
} from "ys-dte";
import { PickData, SingleLineLayer } from "./singleline-layer";
import { Line2Frame } from "./line2Frame";
interface ColorMapData {
  [key: string]: [number, core.ColorRepresentation][];
}
const attrMap = {
  h: "水位",
  wl: "水深",
  q: "流量",
  v: "流速",
};

const mapAttr = {
  水位: "h",
  水深: "wl",
  流量: "q",
  流速: "v",
};
export const themeMap: ColorMapData = {
  水位: [
    [0, 0xffffff],
    [0.1, 0xecf2fe],
    [0.2, 0xd5e3fc],
    [0.3, 0xbbd3fc],
    [0.4, 0x97bcf8],
    [0.5, 0x699ef6],
    [0.6, 0x4787f0],
    [0.7, 0x266fe8],
    [0.8, 0x0052d9],
    [0.9, 0x0034b5],
    [1.0, 0x001f97],
  ],

  水深: [
    [0, 0xffffff],
    [0.1, 0xfdecee],
    [0.2, 0xf9d7da],
    [0.3, 0xf8b9be],
    [0.4, 0xf78d94],
    [0.5, 0xf36d78],
    [0.6, 0xf04e59],
    [0.7, 0xc9363f],
    [0.8, 0xb11f26],
    [0.9, 0x951113],
    [1.0, 0x680506],
  ],
  流量: [
    [0, 0xffffff],
    [0.1, 0xfff3e7],
    [0.2, 0xf9e0c7],
    [0.3, 0xf7c798],
    [0.4, 0xf29960],
    [0.5, 0xed7b2f],
    [0.6, 0xd35b22],
    [0.7, 0xba441a],
    [0.8, 0x9e360f],
    [0.9, 0x852b0a],
    [1.0, 0x852b0a],
  ],

  流速: [
    [0, 0xffffff],
    [0.1, 0xe4f5ee],
    [0.2, 0xbcecdc],
    [0.3, 0x85dcbe],
    [0.4, 0x48c79c],
    [0.5, 0x00a871],
    [0.6, 0x098c5c],
    [0.7, 0x067a45],
    [0.8, 0x046334],
    [0.9, 0x034f2b],
    [1.0, 0x033016],
  ],
  ...dte.ColorMapKeywords,
};
interface Chanel {
  id: number;
  chanel: string;
  x: number;
  y: number;
  position?: number[];
  lnglats?: number[];
  time: number[];
  h: number[];
  wl: number[];
  q: number[];
  v: number[];
  list: { time: number; h: number; wl: number; q: number; v: number }[];
}
interface LineParams {
  autoplay?: boolean; //  自动播放帧动画
  enableGUI?: boolean; //  启用GUI
  needUpdateBottom?: boolean; //  是否需要贴合地形
  bottomOffset?: number; //  贴合地形的偏移量
  updateLinewidthByZoom?: boolean; //  线宽随zoom变化
  duration?: number; // 帧动画时间间隔
  linewidth?: number; // 线宽
  linewidthList?: number[]; // 线宽数组
  pickLinewidth?: number; // 拾取线宽
  attributeName?: string;
  url: string; // 数据
  colorList?: number[]; // [0x000000, 0x0000ff, 0x00ff00, 0xff0000,  0xffffff],
  barValue?: number[]; // [0, .3,.5, .8, 1],
  MinMax?: {
    [key: string]: { MinValue: number; MaxValue: number } | number;
    time?: number;
  };
  onPick?: (data: { data: PickData[]; ev: { x: number; y: number } }) => void; //   物理量拾取回调
  onFrameChange?: (index: number, timestamp: number) => void; //    动画帧变化回调
}

const chanelInfo: {
  [key: string]: {
    color: string;
    offset: number;
    center: number[];
  };
} = {
  西总干渠: {
    color: "#123456",
    offset: 0.9999, // 1.0006 1.0009 100085

    // 可能需要拟合的点 115.95031334979677,28.357188569733665

    center: [
      116.02226376889303, 28.40843396018893,
      // 115.96891303280756, 28.59355698342796,
      // 116.05412039444371,28.40013881324687
      // 116.00841263561188, 28.40068616677999,//顾得了上面
      // 116.03905794568573,  28.403205442369526 //顾得了下面
    ],
  },
  总干新一支渠: {
    // 挺好的
    offset: 1,
    color: "#fa0000",
    center: [116.04848629721789, 28.248473846424417],
  },
  一干渠: {
    // 挺好的
    offset: 1,
    color: "#fe0000",
    center: [115.94710483373109, 28.252234480603775],
  },
  二干渠: {
    // 下面差点
    offset: 1.0005,
    color: "#f0ffee",
    center: [
      // 116.06266537278196,28.481662562663644,
      116.05729029012417, 28.48493643532538,
    ],
  },
  总干一支渠: {
    // 严丝合缝
    offset: 0.999,
    color: "#ff0000",
    center: [115.94826130549876, 28.341996699210952],
  },
  三干渠: {
    offset: 0.9994,
    color: "#0f12f4",
    center: [
      // 115.88343489018621,28.459192230898978,
      115.87241504734908, 28.458644688452026,
    ],
  },
  五干渠: {
    offset: 0.9997, // 1.0001 1.0005  现在除了上端长一点儿 基本贴合
    color: "#fe0000",
    center: [
      // 115.95648379683507, 28.650886281490486,
      115.95409704094652, 28.64901831616885,
    ],
  },
  六干渠: {
    offset: 0.9996, // 可以看 上面差一点儿
    color: "#fff000",
    center: [116.05316604393408, 28.693404961288707],
  },
  四干渠: {
    color: "#ff0f00",
    offset: 1,
    center: [116.03767315294539, 28.615778412108213],
  },
  东总干渠: {
    //  看得过去
    offset: 1,
    color: "#fa0000",
    center: [116.15032474502658, 28.26673907685391],
  },
  电干渠: {
    //  看得过去
    offset: 1,
    color: "#fa0000",
    center: [116.16413270216714, 28.295061044781633],
  },
};

export class LineLayers {
  map: mapboxgl.map;
  params: LayerParams;
  raycaster: RaycastMap;
  frameIndex = 0;
  autoplay = true;
  /** 默认为1fps*/
  duration = 1000;
  linewidth = 2;
  updateLinewidthByZoom = false;
  attributeName = "w";
  frameBuffer = new core.WebGLRenderTarget();
  GPUSelect = false;
  cw = 0;
  ch = 0;
  mouse = { x: 0, y: 0 };
  needRead = false; // 仅demo 用于测试
  pixelBuffer = new Uint8Array(0);
  jsonLoader: JsonLoader;
  lineFrameGroups: Line2Frame[] = [];
  singleLineLayers: SingleLineLayer[] = [];
  gui: GUI;
  enableGUI = true;
  needUpdateBottom = false; //  是否需要贴合地形
  guiOptions: { [key: string]: any };
  viewChanged = true; // 视图是否变化了
  currentValue = 0;
  lineGuiController: any; // 仅demo 用于同步gui显示
  PhysicalValGuiController: any; // 仅demo 用于同步gui显示
  dataList: any;
  frameTotal = 0;
  frameController: any; // 仅demo 用于同步gui显示
  colorList?: number[]; // [0x000000, 0x0000ff, 0x00ff00, 0xff0000,  0xffffff],
  barValue?: number[];
  mapCenter: number[];
  MinMax: { [key: string]: { MinValue: number; MaxValue: number } };
  frameTimes: number[] = [];
  onPick = (data: { data: PickData[]; ev: { x: number; y: number } }) => {}; //  物理量拾取事件
  url: string;
  /**外部监听动画播放 */
  onFrameChange = (index: number, timestamp: number) => {};
  bottomOffset = 10; // 贴合地形的高度偏移值
  pickLinewidth = 0;
  linewidthList: number[] = [];
  lineIDs: string[] = [];// 用于调校坐标转换系数
  loopID: number;
  constructor(Params: LayerParams, lineParams?: LineParams) {
    this.map = Params.map;
    this.params = Params;
    lineParams && this.initLineParams(lineParams);
    this.mapCenter = Params.center;
    this.updateSize();

    this.createLines();
    this.initEvents();
  }
  initLineParams(lineParams: LineParams) {
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
  }
  //  处理数据  后面交给后端  目前还没处理的有排序， position的最值
  initData(url: string) {
    const chanelMap: any = {};
    const MinMaxs = this.MinMax || {
      h: { MinValue: 0, MaxValue: 0 },
      wl: { MinValue: 0, MaxValue: 0 },
      q: { MinValue: 0, MaxValue: 0 },
      v: { MinValue: 0, MaxValue: 0 },
      position: { MinValue: 7000, MaxValue: -4000 }, // 暂时写死
    };

    const p1 = fetch(url)
      .then((b) => b.json())
      .then((res: { sections: Chanel[] }) => {
        res.sections.forEach((item: Chanel) => {
          let chanel = chanelMap[item.chanel];
          let lnglat: mapboxgl.LngLatLike = [item.x, item.y];
          let altitude = this.map.queryTerrainElevation(lnglat, {
            exaggerated: false,
          });

          //  不同的渠道以各自的中心为中心
          let mercator = mapboxgl.MercatorCoordinate.fromLngLat(
            chanelInfo[item.chanel].center
          );
          // let xyz0 =  LineLayers. coordinateTransform({altitude:0, latitude:item.y, longitude:item.x}, mercator, .9985)
          let xyz = LineLayers.coordinateTransformXY(
            item.x,
            item.y,
            mercator,
            chanelInfo[item.chanel].offset
          );
          let v3 = new core.Vector3(xyz[0], 0, xyz[1]);
          if (!chanel) {
            chanel = {
              points: [item],
              chanel: item.chanel,
              time: item.list[0].time * 1000,
              frames: [
                /*
                time:number
                attributes:{
                  h: [],
                  wl: [],
                  q: [],
                  v: [],
                },
                */
              ],
            };
            chanelMap[item.chanel] = chanel;
            chanel.vec3 = [v3];
            chanel.features = [lnglat];
            chanel.lnglats = [...lnglat, 0]; // 配合后续方法
            chanel.ids = [item.id]; // 配合后续方法
          } else {
            chanel.points.push(item);
            chanel.lnglats.push(...lnglat, 0);
            chanel.ids.push(item.id); // 配合后续方法
            chanel.features.push(lnglat);
            chanel.vec3.push(v3);
          }

          // 把同一帧的数据集合
          if (!chanel.position) {
            // @ts-ignore
            chanel.position = [...v3];
          } else {
            // @ts-ignore
            chanel.position.push(...v3);
          }

          if (!chanel.attributes) {
            chanel.indexes = [];

            chanel.attributes = {
              // todo
              v: [],
              h: [],
              wl: [],
              q: [],
            };
          } else {
            let end = chanel.indexes[chanel.indexes.length - 1] || 0;
            chanel.indexes.push(end, end + 1);
          }

          chanel.attributes.v.push(item.list[0].v);

          chanel.attributes.h.push(item.list[0].h);

          chanel.attributes.wl.push(item.list[0].wl);

          chanel.attributes.q.push(item.list[0].q);

          const hasTimes = this.frameTimes.length;
          item.list.forEach((p, ind) => {
            // 传入最值则不用计算
            if (!this.MinMax) {
              MinMaxs.h.MinValue = Math.min(p.h, MinMaxs.h.MinValue);
              MinMaxs.h.MaxValue = Math.max(p.h, MinMaxs.h.MaxValue);
              MinMaxs.wl.MinValue = Math.min(p.wl, MinMaxs.wl.MinValue);
              MinMaxs.wl.MaxValue = Math.max(p.wl, MinMaxs.wl.MaxValue);
              MinMaxs.q.MinValue = Math.min(p.q, MinMaxs.q.MinValue);
              MinMaxs.q.MaxValue = Math.max(p.q, MinMaxs.q.MaxValue);
              MinMaxs.v.MinValue = Math.min(p.v, MinMaxs.v.MinValue);
              MinMaxs.v.MaxValue = Math.max(p.v, MinMaxs.v.MaxValue);
            }
            if (!hasTimes) {
              this.frameTimes.push(p.time * 1000);
            }
            if (!chanel.frames[ind]) {
              chanel.frames[ind] = {
                time: new Date(p.time * 1000).toLocaleString(),
                timestamp: p.time * 1000,
                attributes: {
                  h: [],
                  wl: [],
                  q: [],
                  v: [],
                },
              };
            }
            chanel.frames[ind].attributes.h.push(p.h);
            chanel.frames[ind].attributes.v.push(p.v);
            chanel.frames[ind].attributes.wl.push(p.wl);
            chanel.frames[ind].attributes.q.push(p.q);
          });
          chanel.MinMax = MinMaxs;
        });

        this.MinMax = MinMaxs;
        const timeLength = res.sections[0].list.length;

        console.log(chanelMap);

        const datas: AttributeFrames[] = [];
        const framesDatas: {
          chanelName: string;
          lnglat: number[];
          frames: {
            time: string;
            timestamp: number;
            attributes: {
              h: [];
              wl: [];
              q: [];
              v: [];
            };
            userData: {[key: string]: any};
          }[];
        }[] = [];
        for (const key in chanelMap) {
          const chanel = chanelMap[key];

          let geo = new core.BufferGeometry();
          geo.setAttribute(
            "position",
            new core.Float32BufferAttribute(chanel.position, 3)
          );

          geo.setIndex(chanel.indexes);

          for (const attr in chanel.attributes) {
            geo.setAttribute(
              attr,
              new core.Float32BufferAttribute(chanel.attributes[attr], 1)
            );
          }
          geo.name = key;
          geo.userData = {
            time: chanel.time,
            ...chanel.MinMax,
          };
          datas.push({
            geometry: geo,
            // @ts-ignore
            attributes: geo.attributes,
            userData: {
              time: chanel.time,
              ...chanel.MinMax,
            },
            MinMax: chanel.MinMax,
          });
          //  处理每一帧的数据
          const chanelFrames = {
            chanelName: key,
            // @ts-ignore
            frames: [],
            lnglat: chanel.lnglats,
            points: chanel.position,
            ids: chanel.ids,
            features: chanel.features,
          };
          for (let i = 0; i < timeLength; i++) {
            const frame = chanel.frames[i];
            for (const attr in frame.attributes) {
              frame.attributes[attr] = new core.Float32BufferAttribute(
                frame.attributes[attr],
                1
              );
            }
            chanelFrames.frames.push({
              geometry: geo, // 更新帧的时候再更新attributes
              time: frame.time,
              timestamp: frame.timestamp,
              attributes: frame.attributes,
              userData: {
                ...geo.userData,
                time: frame.time, // 只有time不同
              },
              MinMax: {
                ...geo.userData,
              },
            });
          }
          framesDatas.push(chanelFrames);
        }
        console.log(framesDatas, "framedatas");
        return framesDatas;
      });

    return p1;
  }
  //  用处理好的数据构建线条
  createLines() {
    const lineColors =['#1ECBE1','#961EE1','#E1341E','#6AE11E','#E718CF','#E79718','#18E730','#1868E7']
    this.initData(this.url).then((dataList: any) => {
      this.dataList = dataList;
      this.frameTotal = dataList[0].frames.length;
      const chanelCenterMap: { [key: string]: any } = {};
      // const testarr= [dataList[0],dataList[3]]
      dataList.forEach(
        (
          data: {
            frames: AttributeFrames[];
            chanelName: string;
            lnglat: number[];
            points: number[];
            ids: number[];
            features: mapboxgl.LngLatLike[];
            color: string;
          },
          index: number
        ) => {
          const lineLayer = new SingleLineLayer(
            //  不同的渠道以各自的中心为中心
            {
              ...this.params,
              id: data.chanelName,
              center: chanelInfo[data.chanelName].center,
            },
            {
              lineData: {
                ...data,
                colorList: this.colorList,
                barValue: this.barValue,
              },
              attributeName: this.attributeName,
              linewidth: this.linewidthList[index] || this.linewidth,
              pickLinewidth: this.pickLinewidth,
              frameBuffer: this.frameBuffer,
              ch: this.ch,
              cw: this.cw,
            }
          );

          const geojson = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  properties: {},
                  type: "LineString",
                  coordinates: data.features,
                },
              },
            ],
          };
          //  @ts-ignore
          this.map.addSource(data.chanelName, {
            type: "geojson",
            data: geojson,
          });
          let id = "Line-" + data.chanelName ;
          this.map.addLayer({
            id,
            type: "line",
            source: data.chanelName,
            layout: { "line-join": "round", "line-cap": "round", visibility: "none" },
             paint: { "line-color": lineColors[(index % 8)], "line-width": 5 },
          });

          this.lineIDs.push(id) ;

          this.lineFrameGroups.push(lineLayer.line);
          this.singleLineLayers.push(lineLayer);
        }
      );

      // console.log(chanelCenterMap);

      let start = 0;
      const ani = (t: number) => {
        //  改成遍历更新
        if (this.autoplay && t - start > this.duration) {
          this.frameIndex++;
          if (this.frameIndex > this.frameTotal - 1) {
            this.frameIndex = 0;
          }

          this.enableGUI
            ? this.frameController.setValue(this.frameIndex)
            : this.goto(this.frameIndex);
          start = t;
        }

      this.loopID =  requestAnimationFrame(ani);
      };
      ani(0);
      this.enableGUI && this.initGui();
      this.map.flyTo({
        center:this.mapCenter,
        zoom: 9.5,
      });
    });
    console.log(this.map.getStyle());

  }

  resize=()=>{
    this.updateSize();
    this.singleLineLayers.forEach((item) => {
      item.updateSize(this.cw, this.ch);
    });
  }

  initEvents() {
    this.map.on("click", (ev: mapboxgl.MapMouseEvent) => {
      if (!this.GPUSelect) return
        this.mouse = ev.point;

        let res = this.getInfoByEV(ev.point);
        this.onPick({ data: res, ev: ev.point });
        if (this.enableGUI && res && res.length) {
          this.PhysicalValGuiController.setValue(res[0].value);
        }

    });
    //  如果需要线宽随zoom变化请开启
    this.updateLinewidthByZoom &&this.map.on("zoom", this.updateLinewidthWidthZoom);

    this.map.on("moveend", this.updateView);
    this.map.on("zoomend", this.updateView);
    this.needUpdateBottom &&
      this.map.on("mouseup",this.updateBottom);
    window.addEventListener("resize", this.resize);
  }
  updateView=()=>{
    this.viewChanged = true;
  }
  updateLineWidth(w: number) {
    this.singleLineLayers.forEach((layer) => {
      layer.linewidth = w;
      layer.updateLineWidth(w);
    });
    this.viewChanged = true;
  }
  updateLinewidthWidthZoom= () => {
    const z = this.map.getZoom();
    // 目前z的范围大概在 5-20 这个曲线请根据项目实际情况调整
    const w = Math.sin(z * 0.17 - 2) * 14 + 14;
    this.linewidth = w;
    this.enableGUI
      ? this.lineGuiController.setValue(this.linewidth)
      : this.updateLineWidth(this.linewidth);
    //  console.log( 'zoom',z ,'    线宽', w, );
  }
  updateBottom(offset = this.bottomOffset) {
    this.singleLineLayers.forEach((l) => l.updateBottom(offset));
  }

  initGui() {

    this.gui = new GUI({container:this.map.getContainer()});
    const disposeFn = this.dispose;
    const options = {
      linewidth: this.linewidth,
      // alphaToCoverage: true,
      // dashed: false,
      showMapLine: false,
      播放速度: 6000_0 / this.duration,
      attributeName: this.attributeName,
      colorTheme: "水位",
      "暂停/继续": () => {
        this.autoplay = !this.autoplay;
      },
      物理量拾取: this.GPUSelect,
      currentValue: 0,
      frameIndex: this.frameIndex,
      go: () => {
        this.autoplay = false;
        this.singleLineLayers.forEach((layer) => {
          layer.autoplay = false;
        });
        let v = this.frameIndex + 1;
        if (v >= this.frameTotal) {
          v -= this.frameTotal;
        }
        if (v < 0) {
          v += this.frameTotal;
        }
        this.frameController.setValue(v);
      },
      back: () => {
        let v = this.frameIndex - 1;
        if (v >= this.frameTotal) {
          v -= this.frameTotal;
        }
        if (v < 0) {
          v += this.frameTotal;
        }

        this.frameController.setValue(v);
        this.singleLineLayers.forEach((layer) => {
          layer.autoplay = false;
        });
      },
      dispose(){
        disposeFn()
      }
    };
    this.guiOptions = options;

    this.lineGuiController = this.gui
      .add(options, "linewidth", 0, 30, 1)
      .onChange((w: number) => {
        this.updateLineWidth(w);
      });

    this.gui
      .add(options, "showMapLine")
      .onChange((w: boolean) => {
          this.lineIDs.forEach((id) => {
            this.map.setLayoutProperty( id,'visibility', w ? "visible" : "none");
          })

      });
       this.gui
      .add(options, "attributeName", ["水深", "流量", "流速", "水位"])
      .onChange((attr: "水深" | "流量" | "流速" | "水位") => {
        let attrName = mapAttr[attr];
        this.attributeName = attrName;
        this.singleLineLayers.forEach((layer) => {
          layer.setAttributeName(attrName);
        });
      });
    this.gui
      .add(options, "colorTheme", [
        "水位",
        "rainbow",
        "cooltowarm",
        "水深",
        "流量",
        "流速",
      ])
      .onChange((theme: string | number) => {
        this.singleLineLayers.forEach((layer) => {
          layer.setColor(themeMap[theme]);
        });
      });
    this.gui.add(options, "暂停/继续");
    this.gui.add(options, "go").name("下一帧");
    this.gui.add(options, "back").name("上一帧");
    this.frameController = this.gui
      .add(options, "frameIndex", 0, this.frameTotal - 1, 1)
      .name("指定帧")
      .onChange((v: number) => {
        this.goto(v);
      });

    this.gui.add(options, "物理量拾取").onChange((v: boolean) => {
      this.GPUSelect = v;
    });
    this.gui.add(options, "播放速度", 1, 1000, 10).onChange((v: number) => {
      this.duration = 6000_0 / v;
    });

    this.PhysicalValGuiController = this.gui
      .add(options, "currentValue")
      .name("物理量");
    this.gui.add(options, "dispose").name("销毁")
  }

  framePause() {
    this.autoplay = false;
  }

  frameResume() {
    this.autoplay = true;
  }
  updateSize() {
    let canvas = this.map.getCanvas();
    let { clientWidth, clientHeight } = canvas;
    this.cw = clientWidth;
    this.ch = clientHeight;
  }
  readPixels() {}
  getInfoByEV(ev: { x: number; y: number }): PickData[] {
    const res = [];
    // dpr有小数时会导致坐标有小数
    ev.x = ev.x | 0;
    ev.y = ev.y | 0;
    for (let index = 0; index < this.singleLineLayers.length; index++) {
      const layer = this.singleLineLayers[index];
      let info = layer.getInfoByEV(ev, this.viewChanged);
      if (info) {
        res.push(info);
        console.log(info);
        // return [info] //  这样优化就会导致有些线一直都没有绘制进缓冲区里
      }
    }
    this.viewChanged = false;
    // console.log(res);
    return res;
  }
  goto(frameIndex = this.frameIndex) {
    this.singleLineLayers.forEach((layer: SingleLineLayer, index) => {
      layer.goto(frameIndex);
    });
    this.frameIndex = frameIndex;
    this.onFrameChange(frameIndex, this.frameTimes[frameIndex]);
  }
  goahead() {
    this.goto(++this.frameIndex);
  }
  back() {
    this.goto(--this.frameIndex);
  }

  dispose=()=> {
    this.GPUSelect = false;
    this.autoplay = false;
    this.map.off("zoom", this.updateLinewidthByZoom);
    this.map.off("click", );
    this.map.off("zoomend", this.updateView);
    this.map.off("moveend", this.updateView);
    this.map.off("mouseup",this.updateBottom);
    window.removeEventListener("resize", this.resize);
    this.frameBuffer.dispose();
    cancelAnimationFrame(this.loopID);
    this.singleLineLayers.forEach((layer) => {;
      layer.dispose();
    });
    this.singleLineLayers = null;
    this.gui?.destroy();
  }
  /**
   * 经纬度转直角坐标
   * @param geoCoordinate
   * @param sceneMercator
   * @param offset 修正系数，1表示不需要修正
   * @returns
   */
  static coordinateTransform(
    geoCoordinate: mapboxgl.GeoCoordinate,
    sceneMercator: mapboxgl.MercatorCoordinate,
    offset = 1
  ): number[] {
    const { longitude, latitude, altitude } = geoCoordinate;

    const { x, y } = sceneMercator;

    const point = mapboxgl.MercatorCoordinate.fromLngLat(
      [longitude, latitude],
      altitude
    );
    const { x: mx, y: my } = point;
    const scale = point.meterInMercatorCoordinateUnits() * offset;

    return [(mx - x) / scale, (y - my) / scale, altitude];
  }

  static coordinateTransformXY(
    lng: number,
    lat: number,
    sceneMercator: mapboxgl.MercatorCoordinate,
    offset = 1
  ) {
    const { x, y } = sceneMercator;
    let mx = this.mercatorXfromLng(lng);
    let my = this.mercatorYfromLat(lat);
    const uCenter = sceneMercator.meterInMercatorCoordinateUnits() * offset;
    const u1 = mapboxgl.MercatorCoordinate.fromLngLat(
      [lng, lat],
      0
    ).meterInMercatorCoordinateUnits();
    return [
      (((mx - x) / uCenter) * u1) / uCenter,
      (((my - y) / uCenter) * u1) / uCenter,
    ];
  }

  getMeshCenterLnglat(obj3D: core.Mesh): number[] {
    let box = new core.Box3();
    box.setFromObject(obj3D);
    let center = box.getCenter(new core.Vector3());
    console.log(center);

    let target = this.coordinateInvert(center, this.mapCenter);
    return target;
  }
  coordinateInvert(
    point: { x: number; y: number; z: number },
    center: number[]
  ): Array<number> {
    let sceneMercator = mapboxgl.MercatorCoordinate.fromLngLat(center, 0);
    const { x, y, z } = sceneMercator;
    const scale = sceneMercator.meterInMercatorCoordinateUnits();
    const m = new mapboxgl.MercatorCoordinate(
      point.x * scale + x,
      point.z * scale + y,
      point.y
    );
    return [...m.toLngLat().toArray()];
  }

  static mercatorXfromLng(lng: number): number {
    return (180 + lng) / 360;
  }

  static mercatorYfromLat(lat: number): number {
    return (
      (180 -
        (180 / Math.PI) *
          Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))) /
      360
    );
  }
}
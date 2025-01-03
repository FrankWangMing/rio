import { LineLayers } from "./layers/line-layer";
import { PickData } from "./layers/singleline-layer";
import { useEffect, useRef, useState  } from "react";
import {
  mapboxgl,
  MapDTEOptions,
  getMapController,
} from "ys-dte";

function formatDate(timestamp:number) {
  const  date = new Date(timestamp)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


const options: MapDTEOptions = {
  container: "map-root1",
  zoom: 11,
  minZoom: 5,
  maxZoom: 20,
  bearing: 0,
  maxPitch: 80,
  center: [116.01298198216045, 28.475383964994336],
  pitch: 0,
  terrain: false,
  antialias: true,
  style: {
    version:8,
    glyphs: "http://10.0.4.131:4001/glyphs/{fontstack}/{range}.pbf",
    sources: {
      'area-source':{
        type: 'geojson',
        data: `http://10.0.4.131:4001/examples/json/geojson/ys_irrigation_area.geojson`,
      },
      'satellite':{
        type: 'raster',
        tiles: [`http://10.0.4.131:4001/ys-irrigation-area/img_w/{z}/{x}/{y}.png`],
        tileSize: 256,
      },
      'canal-name-source': {
        type: 'geojson',
        data: `http://10.0.4.131:4001/examples/json/geojson/ys_irrigation_canal.geojson`,
      }
    },
    layers: [
      {
        id:'bg',
        type:'background',
        paint:{
          'background-color':'#000004'
        }
      },
      {
        id:'satellite',
        source:'satellite',
        type:'raster',

      },
      {
        id: 'area-layer',
        source: 'area-source',
        type: 'line',
        paint: {
          'line-color': '#8CF9FF',
          'line-width': 2,
        },
      },
      {
        id: `area-fill-layer`,
        type: 'fill',
        source: `area-source`,
        paint: {
          'fill-color': '#8CF9FF',
          'fill-opacity': 0.2,
        },
      },
      {
        id: `canal-name-layer`,
        source: `canal-name-source`,
        type: 'symbol',
        layout: {
          'text-field': '{NAME}',
          // 'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 14,
        },
        paint: {
          'text-color': '#FF9A2C',
        },
      },


    ]
  }
};

const ProgressBarInitConf = {
  width: 925,
  height: 80,
  fontSize: 16,
  isShowCondition: false,
  timeInterval: 60,
  progressLine: {
    style: {
      height: '8rem',
      background: '#ffffff70',
      borderRadius: '4rem',
    },
    passLineCss: {
      height: '8rem',
    },
    tickStyle: {
      height: '12rem',
      background: '#ffffff70',
      borderRadius: 0,
    },
    labelStyle: {
      fontSize: '18rem',
      fontFamily: 'pingfangM',
      color: '#FFFFFF',
      lineHeight: '28rem',
    },
    isShowTime: false,
    showTimeFormat: 'HH:mm',
    isShowDate: true,
    showDateFormat: 'YYYY/MM/DD',
  },
  hoverTitleCss: {
    background: '#ffffff93',
    border: 'unset',
    borderRadius: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10rem',
    whiteSpace: 'nowrap',
  },
};
interface LocalStore {
  isPlaying: boolean;
  updatePlaying: (data: boolean) => void;
  currFrameIndex: number;
  updateCurrFrameIndex: (data: number) => void;
}
const typeOptions = [
  { label: '水位', value: 'h' },
  { label: '水深', value: 'wl' },
  { label: '流量', value: 'q' },
  { label: '流速', value: 'v' },
];
const imgOfTypeMap = new Map([
  ['水位', 'waterLevelLegend'],
  ['水深', 'waterDeepLegend'],
  ['流量', 'flowLegend'],
  ['流速', 'flowVelocityLegend'],
]);
const typeUnitMap = new Map([
  ['水位', 'm'],
  ['水深', 'm'],
  ['流量', 'm3/s'],
  ['流速', 'm/s'],
]);

const typeOfValue = new Map([
  ['水位', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]],
  ['水深', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
  ['流量', [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]],
  ['流速', [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]],
]);
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
  };

  const smartDispatch = {
    playerStart: '/images/smartDispatch/player-start.png',
    uploadIcon: '/images/smartDispatch/upload-icon.png',
    playerNext: '/images/smartDispatch/player-next.png',
    playerPause: '/images/smartDispatch/player-pause.png',
    playerReplay: '/images/smartDispatch/player-replay.png',
    playerPre: '/images/smartDispatch/player-pre.png',
    previewTitle: '/images/smartDispatch/preview-title.png',
    back: '/images/smartDispatch/back.png',
    waterDeepLegend: '/images/smartDispatch/water-deep-legend.png',
    waterLevelLegend: '/images/smartDispatch/water-level-legend.png',
    flowLegend: '/images/smartDispatch/flow-legend.png',
    flowVelocityLegend: '/images/smartDispatch/flow-velocity-legend.png',
  };


  const  box = document.createElement('div');
  box.className = 'box';

  function addPickUpPhysicalQuantities(
    event: { x: number; y: number },
    data:PickData[]
  ) {

    if (!data.length) {
      //取消拾取
      box.innerHTML = '';
      box.style.display = 'none';
      return;
    }
    const { attributeName, frameIndex, ids, timestamp, value } = data[0];
    const physical = new Map([
      ['h', '水位'],
      ['wl', '水深'],
      ['q', '流量'],
      ['v', '流速'],
    ]);
    const unit = new Map([
      ['h', 'm'],
      ['wl', 'm'],
      ['q', 'm3/s'],
      ['v', 'm/s'],
    ]);

    box.style.left = `${event.x}px`;
    box.style.top = `${event.y}px`;

    box.innerHTML = `<span class="title">计算${physical.get(
      attributeName,
    )}</span><span>断面id:${ids[0]},${
      ids[1]
    }</span><span>帧数:${frameIndex}</span><span>时间戳:${
      timestamp / 1000
    }</span><span>时间:${formatDate( timestamp)
    }</span><span class="value">${value}&nbsp${unit.get(
      attributeName,
    )}</span>`;
    box.style.display = 'flex';
  }

  function initMap(onPick = addPickUpPhysicalQuantities) {
  const res: {
    lineLayer: LineLayers;
    map: mapboxgl.Map;
  } = {}
  getMapController({
    ...options,
  }).then((map: mapboxgl.Map) => {
    res.map = map;
    res.lineLayer = new LineLayers(  {
      center: [116.01298198216045, 28.475383964994336],
      map,
      id: 'oneDimensionalHydroDynamicLayer',
    },
    {
      linewidth: 10,
      linewidthList: [15, 10, 10, 10, 10, 10, 10, 10, 10, 15, 10],
      pickLinewidth: 20,
      duration: 200,
      autoplay: true,
      attributeName: 'h',
      url: 'http://10.0.4.131:4001/examples/json/ys_onediem_job.json',
      enableGUI: false,
      updateLinewidthByZoom: false,
      colorList: [
        0xffffff, 0xecf2fe, 0xd5e3fc, 0xbbd3fc, 0x97bcf8, 0x699ef6,
        0x4787f0, 0x266fe8, 0x0052d9, 0x0034b5, 0x001f97,
      ],
      barValue: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      MinMax: {
        time: 1706716800,
        h: {
          MinValue: 20,
          MaxValue: 30,
        },
        wl: {
          MinValue: 0,
          MaxValue: 10,
        },
        q: {
          MinValue: 0,
          MaxValue: 100,
        },
        v: {
          MinValue: 0,
          MaxValue: 1,
        },
        position: {
          MinValue: 7000,
          MaxValue: -4000,
        },
      },
      onPick(data: { data: PickData[]; ev: { x: number; y: number } }) {
        console.log('onPick=', data);
        onPick(  data.ev, data.data)

      },
      onFrameChange(frameIndex, timestamp) {
        // console.log('onFrameChange=', frameIndex, timestamp);
      },
    },
    );


  });

//  const domContainer = document.getElementById('map-root1');
//  domContainer.appendChild(box);
//  const  gui = new GUI({ container: domContainer });
  // const guiOpt = {
  //   fullscreen() {
  //     if (!document.fullscreenElement) {
  //       domContainer.requestFullscreen()
  //     }
  //   },
  //   物理量拾取:false,
  // }

  // gui.add(guiOpt, 'fullscreen');
  // gui.add( guiOpt, '物理量拾取').onChange((value) => {

  //   res.lineLayer && (res.lineLayer.GPUSelect = value);
  // })

  return res;

}
function Start() {
  const mapInfo =   useRef<{map, lineLayer: LineLayers }>({});
  const [actType, setActType] = useState('水位');
  const [virtualinfo , setVirtualinfo] = useState('')
  useEffect(() => {

    const res= initMap();
    mapInfo.current = res;

      // document.getElementById("map-root1").style.fontSize = '0.66875px';
    return () => {
      // document.getElementById("map-root1")?.style.fontSize = 'unset';
    }
  },[])
  return <div id="map-root1" style={{"position":"relative"}} >
      <div className="legend">
        {typeOptions.map((item) => (
          <div
            className={ actType === item.label ? 'act-legend-btn' : 'legend-btn' }
            onClick={() => {

              const lineLayers = mapInfo.current.lineLayer.singleLineLayers ;
              lineLayers.forEach((layer: any) => {
                // 切换物理量
                layer.setAttributeName(item.value);
                // 切换颜色主题
                layer.setColor(themeMap[item.label]);
              });

              setActType(item.label);
              box.style.display = 'none'
            }}
            key={item.label}
          >
            {item.label}
          </div>
        ))}
        <div className="legend-unit">单位({typeUnitMap.get(actType)})</div>
        <div className="color-list">
          <img
            src={
              'http://10.0.4.128:8390/'+ smartDispatch [  imgOfTypeMap.get(actType) || '']
            }
          />
          <div className="numbers">
            {typeOfValue.get(actType)?.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
  </div>

}

export default Start;

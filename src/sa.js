import sa from 'sa-sdk-javascript'

let API_ENV = process.env.API_ENV
let sensor_config_server_url_param = 'default'
if (API_ENV == 'pro') {
  sensor_config_server_url_param = 'production'
}

sa.init({
  server_url: 'https://shence.ngmm365.com/sa?project=' + sensor_config_server_url_param,
  heatmap_url: 'https://static.sensorsdata.cn/sdk/1.9.6/heatmap.min.js',
  web_url: 'https://shence.ngmm365.com:4107/project=' + sensor_config_server_url_param,
  // server_url: 'https://shenceproxy.ngmm365.com/sa?project='+sensor_config_server_url_param,
  heatmap: {},
  use_app_track: true, // 使用app转发
  send_type: 'ajax'// 发送类型
})
// sa.login(user_id);
sa.quick('autoTrack')

if (window) {
  window.sa = sa
}

export default {
  sa
}

export { sa }

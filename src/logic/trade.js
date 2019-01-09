export default {
    // 判断订单，是否应该显示物流查看按钮
    check_trade_show_logis(trade) {
        return (trade.tradeState == 6 || trade.tradeState == 7 ||trade.tradeState == 3 || trade.tradeState == 8) && trade.expressesCode && trade.postId;
    },
    get_trade_remain_ms(trade) {
        var diff = trade.createdTime + trade.paymentInterval * 60 * 1000 - (trade.systemTime || new Date().getTime());
        return diff > 0 ? diff : 0;
    },
    checkShowQrsh(trade){
		return trade.tradeState == 6;
	},
	//判断是否显示拍照晒单
	checkShowPjsd(trade){
		return trade.tradeState == 7 && trade.ratable && !trade.groupBuyId && !trade.virtual;
	},
}

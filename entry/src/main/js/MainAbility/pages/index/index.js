import { renderBarcode128 } from '../../lib/barcode128';

export default {
    data: {
        error: null
    },
    onInit() {
        //do not render barcode here
    },
    onShow() {
        const canvas = this.$refs.canvasRef;
        renderBarcode128(canvas, "123456789" , {
            startingPointX: 10,
            startingPointY: 5,
            barHeight: 80,
            barWidth: 2,
            barColor: '#111111',
            bgColor: '#ffffff'
        })
    }
}

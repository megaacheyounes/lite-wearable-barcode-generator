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
        renderBarcode128(canvas, "123456789" )
    }
}

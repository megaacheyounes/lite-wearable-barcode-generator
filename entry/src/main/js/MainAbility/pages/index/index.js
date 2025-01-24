import { renderBarcode128, BarcodeErrorCodes } from '../../lib/barcode128';

/**
 * example screen for rendering code128C barcode
 */
export default {
    data: {
        error: null
    },
    onInit() {
        //do not render barcode here
    },
    onShow() {
        const canvas = this.$refs.canvasRef;
        this.example1(canvas)
    },
    example1(canvas) {
        //simple
        renderBarcode128(canvas, "123456789")
    },
    example2(canvas) {
        renderBarcode128(canvas, "123456789", {
            startingPointX: 75,
            startingPointY: 125,
            barHeight: 200,
            barWidth: 3.5
        })
    },
    example3(canvas) {
        renderBarcode128(canvas, "123456789123456789", {
            bgColor: "#ffc05252",
            barColor: "#fff"
        })
    },
    errorHandling(canvas) {
        renderBarcode128(canvas, '@#$%&!', {
            onRenderFailed: (code) => {
                switch (code) {
                    case BarcodeErrorCodes.CANVAS_UNDEFINED:
                        this.error = "Canvas is undefined";
                        break;
                    case BarcodeErrorCodes.VALUE_INVALID:
                        this.error = "Invalid barcode characters";
                        break;
                    case BarcodeErrorCodes.VALUE_LENGTH_INVALID:
                        this.error = "Barcode value too long";
                        break;
                    case BarcodeErrorCodes.INTERNAL_ERROR:
                        this.error = "Internal barcode generation error";
                        break;
                    default:
                        this.error = "Unknown error";
                }
            }
        });
    }
}

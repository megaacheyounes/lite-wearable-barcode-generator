import { renderBarcode128, BarcodeErrorCodes } from '../../lib/barcode128';

export default {
    data: {
        error: null
    },
    onInit() {
        //do not render barcode here
    },
    onShow() {
        const canvas = this.$refs.canvasRef;
        this.errorHandling(canvas)
    },
    example1(canvas) {
        //simple
        renderBarcode128(canvas, "123456789")
    },
    errorHandling(canvas) {
        renderBarcode128(canvas, '@#$%&!', {
            onRenderFailed: (code) => {
                switch (code) {
                    case BarcodeErrorCodes.CANVAS_UNDEFINED:
                        this.error = "Canvas is undefined";
                        break;
                    case BarcodeErrorCodes.VALUE_INVALID:
                        this.error = "Invalid barcode value";
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

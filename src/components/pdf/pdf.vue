<template>
    <section>
        <canvas ref="pdf-canvas"></canvas>
        <div class="foot" v-if='pdfDoc'>
            <div class="btn_group">
                <button class='left' v-if="pageNum > 1" @click="onPrevPage">上一页</button>
                <div class="block" v-if="pageNum > 1 && pageNum < pdfDoc.numPages"></div>
                <button class='right' v-if="pageNum < pdfDoc.numPages" @click="onNextPage">下一页</button>
            </div>
        </div>
    </section>
</template>

<script>
    import PDFJS from 'pdfjs-dist'
    export default {
        props: {
            url: {
                type: String,
                default: ''
            },
            scale: {
                type: Number,
                default: 1.2
            }
        },
        data() {
            return {
                pdfDoc: null,
                pageNum: 1,
                pageRendering: false,
                pageNumPending: null
            }
        },
        mounted(){
            this.showPDF();
        },
        methods: {
            showPDF() {
                let { url } = this;
                if(!url) return;
                PDFJS.getDocument(url).then((pdf)=>{
                    this.pdfDoc = pdf;
                    this.renderPage(1);
                })
            },
            renderPage(num) {
                this.pageRendering = true;
                let _this = this;
                this.pdfDoc.getPage(num).then(function(page) {
                    var viewport = page.getViewport(_this.scale)
                    let canvas = _this.$refs['pdf-canvas'];
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    // Render PDF page into canvas context
                    var renderContext = {
                        canvasContext: canvas.getContext('2d'),
                        viewport: viewport
                    }
                    var renderTask = page.render(renderContext);
                    // Wait for rendering to finish
                    renderTask.promise.then(function() {
                        _this.pageRendering = false;
                        if (_this.pageNumPending !== null) {
                            // New page rendering is pending
                            this.renderPage(_this.pageNumPending);
                            _this.pageNumPending = null;
                        }
                    })
                })
            },
            queueRenderPage(num) {
                if (this.pageRendering) {
                    this.pageNumPending = num;
                } else {
                    this.renderPage(num);
                }
            },
            onPrevPage() {
                if (this.pageNum <= 1) {
                    return;
                }
                this.pageNum--;
                this.queueRenderPage(this.pageNum);
                window.scrollTo(0, 0);
            },
            onNextPage() {
                if (this.pageNum >= this.pdfDoc.numPages) {
                    return;
                }
                this.pageNum++;
                this.queueRenderPage(this.pageNum);
                window.scrollTo(0, 0);
            }
        }
    }
</script>

<style lang="less" scoped>
    section {
        .foot {
            position: fixed;
            transform: translate(-50%, 0);
            left: 50%;
            bottom: 0.1rem;
            width: 2.1rem;
            text-align: center;
            .btn_group{
                display:flex;
                align-items: center;
                height: 0.4rem;
                justify-content: center;
            }
            button {
                background: #FFAC2D;
                border: none;
                color: white;
                padding: 0 0.2rem;
                border-radius: 0.2rem;
                height: 0.4rem;
                flex: 1;
                box-shadow:0 0.05rem 0.07rem 0 rgba(255,202,122,0.4);
                border-radius: 0.02rem;
                &:first-child{
                    border-top-left-radius:0.5rem;
                    border-bottom-left-radius:0.5rem;
                }
                &:last-child{
                    border-top-right-radius:0.5rem;
                    border-bottom-right-radius:0.5rem;
                }
            }
            .block{
                flex:0 0 0.05rem;
                width:0.05rem;
            }
        }
    }
</style>

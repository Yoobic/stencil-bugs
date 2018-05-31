---
name: Colors
category: Overview
---

```typography.html hidden
    <yoo-slim-scroll>
            <div attr-layout="row" class="color-row">
                <div attr-flex>
                    <div class="square bg-accent-120 light">
                        <span>bg-accent-120</span>
                    </div>
                    <div class="square bg-accent-110 light">
                        <span>bg-accent-110</span>
                    </div>
                    <div class="square bg-accent light">
                        <span>bg-accent</span>
                    </div>
                    <div class="square-small bg-accent-20 accent">
                        <span>bg-accent-20</span>
                    </div>
                    <div class="square-small bg-accent-10 accent">
                        <span>bg-accent-10</span>
                    </div>
                    <div class="square-small bg-accent-05 accent">
                        <span>bg-accent-05</span>
                    </div>
                </div>

                <div attr-flex>
                    <div class="square bg-danger-120 light">
                        <span>bg-danger-120</span>
                    </div>
                    <div class="square bg-danger-110 light">
                        <span>bg-danger-110</span>
                    </div>
                    <div class="square bg-danger light">
                        <span>bg-danger</span>
                    </div>
                    <div class="square-small bg-danger-20 danger">
                        <span>bg-danger-20</span>
                    </div>
                    <div class="square-small bg-danger-10 danger">
                        <span>bg-danger-10</span>
                    </div>
                    <div class="square-small bg-danger-05 danger">
                        <span>bg-danger-05</span>
                    </div>
                </div>

                <div attr-flex>
                    <div class="square bg-success-120 light">
                        <span>bg-success-120</span>
                    </div>
                    <div class="square bg-success-110 light">
                        <span>bg-success-110</span>
                    </div>
                    <div class="square bg-success light">
                        <span>bg-success</span>
                    </div>
                    <div class="square-small bg-success-20 success">
                        <span>bg-success-20</span>
                    </div>
                    <div class="square-small bg-success-10 success">
                        <span>bg-success-10</span>
                    </div>
                    <div class="square-small bg-success-05 success">
                        <span>bg-success-05</span>
                    </div>
                </div>

                <div attr-flex>
                    <div class="square bg-info-120 light">
                        <span>bg-info-120</span>
                    </div>
                    <div class="square bg-info-110 light">
                        <span>bg-info-110</span>
                    </div>
                    <div class="square bg-info light">
                        <span>bg-info</span>
                    </div>
                    <div class="square-small bg-info-20 info">
                        <span>bg-info-20</span>
                    </div>
                    <div class="square-small bg-info-10 info">
                        <span>bg-info-10</span>
                    </div>
                    <div class="square-small bg-info-05 info">
                        <span>bg-info-05</span>
                    </div>
                </div>

                <div attr-flex>
                    <div class="square bg-warning-120 light">
                        <span>bg-warning-120</span>
                    </div>
                    <div class="square bg-warning-110 light">
                        <span>bg-warning-110</span>
                    </div>
                    <div class="square bg-warning light">
                        <span>bg-warning</span>
                    </div>
                    <div class="square-small bg-warning-20 warning">
                        <span>bg-warning-20</span>
                    </div>
                    <div class="square-small bg-warning-10 warning">
                        <span>bg-warning-10</span>
                    </div>
                    <div class="square-small bg-warning-05 warning">
                        <span>bg-warning-05</span>
                    </div>
                </div>
                <div attr-flex>
                    <div class="square bg-dark-120 light">
                        <span>bg-dark-120</span>
                    </div>
                    <div class="square bg-dark-110 light">
                        <span>bg-dark-110</span>
                    </div>
                    <div class="square bg-dark light">
                        <span>bg-dark</span>
                    </div>
                    <div class="square-small bg-dark-80">
                        <span>bg-dark-80</span>
                    </div>
                    <div class="square-small bg-dark-60">
                        <span>bg-dark-60</span>
                    </div>
                    <div class="square-small bg-dark-40">
                        <span>bg-dark-40</span>
                    </div>
                    <div class="square-small bg-dark-20 text-dark">
                        <span>bg-dark-20</span>
                    </div>
                    <div class="square-small bg-dark-10 text-dark">
                        <span>bg-dark-10</span>
                    </div>
                    <div class="square-small bg-dark-05 text-dark">
                        <span>bg-dark-05</span>
                    </div>
                </div>
            </div>

            <!-- <div attr-layout="row">
                <div attr-flex class="square bg-dark light">
                    <span>bg-dark</span>
                </div>
                <div attr-flex class="square bg-balanced light">
                    <span>bg-balanced</span>
                </div>
                <div attr-flex class="square bg-energized light">
                    <span>bg-energized</span>
                </div>
                <div attr-flex class="square bg-assertive light">
                    <span>bg-assertive</span>
                </div>
                <div attr-flex class="square bg-royal light">
                    <span>bg-royal</span>
                </div>
                <div attr-flex class="square bg-calm light">
                    <span>bg-calm</span>
                </div>
            </div> -->

            <div class="rectangle bg-gradient-accent light">
                <span>bg-gradient-accent</span>
            </div>
            <div class="rectangle bg-gradient-danger light">
                <span>bg-gradient-danger</span>
            </div>
            <div class="rectangle bg-gradient-success light">
                <span>bg-gradient-success</span>
            </div> 
            <div class="rectangle bg-gradient-info light">
                <span>bg-gradient-info</span>
            </div>
            <div class="rectangle bg-gradient-warning light">
                <span>bg-gradient-warning</span>
            </div> 
            <div class="rectangle bg-gradient-dark light">
                <span>bg-gradient-dark</span>
            </div> 
    </yoo-slim-scroll>
```

```typography.css hidden
    .square,
    .square-small,
    .rectangle {
        max-width: 130px;
        height: 160px;
        padding: 1rem;
        color: cssvar(light);
        font-weight: 400;
        margin-right: 1rem;
        overflow: hidden;
        white-space:nowrap;
        &.text-dark {
            color: cssvar(dark);
        }
        &.accent {
            color: cssvar(accent);
        }
        &.danger {
            color: cssvar(danger);
        }
        &.success {
            color: cssvar(success);
        }
    }

    .square-small {
        height: 48px;
    }

    .rectangle {
        margin-top: 2rem;
        max-width: 100%;
        height: 100px;
    }

    .color-row {
        flex-wrap: wrap;
    }
```
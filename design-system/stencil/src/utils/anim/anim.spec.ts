import * as fromAnim from './anim';
//jest.mock('./anim');
fromAnim.setAnimation = jest.fn();

fdescribe('Animations', () => {
    describe('Animation Factory should return the correct animation', () => {
        it('Should return background fade animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.backgroundFade)).toEqual(fromAnim.backgroundFade());
        });

        it('Should return fadeIn animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.fade)).toEqual(fromAnim.fade());
        });

        it('Should return fadeInAndScale animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.fadeInAndScale)).toEqual(fromAnim.fadeInAndScale());
        });

        it('Should return slideInRight animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.slideInRight)).toEqual(fromAnim.slideInRight());
        });

        it('Should return slideInBottom animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.slideInBottom)).toEqual(fromAnim.slideInBottom());
        });

        it('Should return newspaper animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.newspaper)).toEqual(fromAnim.newspaper());
        });

        it('Should return fall animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.fall)).toEqual(fromAnim.fall());
        });

        it('Should return slideFall animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.slideFall)).toEqual(fromAnim.slideFall());
        });

        it('Should return stickyUp animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.stickyUp)).toEqual(fromAnim.stickyUp());
        });

        it('Should return flip3dHorizontal animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.flip3dHorizontal)).toEqual(fromAnim.flip3dHorizontal());
        });

        it('Should return flip3dVertical animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.flip3dVertical)).toEqual(fromAnim.flip3dVertical());
        });

        it('Should return sign3d animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.sign3d)).toEqual(fromAnim.sign3d());
        });

        it('Should return superScaled animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.superScaled)).toEqual(fromAnim.superScaled());
        });

        it('Should return slit3d animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.slit3d)).toEqual(fromAnim.slit3d());
        });

        it('Should return rotateBottom3d animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.rotateBottom3d)).toEqual(fromAnim.rotateBottom3d());
        });

        it('Should return rotateInLeft3d animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.rotateInLeft3d)).toEqual(fromAnim.rotateInLeft3d());
        });

        it('Should return blur animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.blur)).toEqual(fromAnim.blur());
        });

        it('Should return fab animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.fab)).toEqual(fromAnim.fab());
        });

        it('Should return wooble animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.wooble)).toEqual(fromAnim.wooble());
        });

        it('Should return shake animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.shake)).toEqual(fromAnim.shake());
        });

        it('Should return slide vertical animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.slideVertical)).toEqual(fromAnim.slideVertical());
        });

        it('Should return slide horizontal animation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.slideHorizontal)).toEqual(fromAnim.slideHorizontal());
        });

        it('Should return transition scale anitmation', async () => {
            expect(fromAnim.animationFactory(fromAnim.animations.transitionScale)).toEqual(fromAnim.transitionScale());
        });

        it('Should return slideInStaggered animation', async () => {
            // Impossible to test equality of anonymous functions without naming them
            let fromFactory = fromAnim.animationFactory(fromAnim.animations.slideInStaggered);
            fromFactory.delay = null;
            let anim = fromAnim.slideInStaggered();
            anim.delay = null;
            expect(fromFactory).toEqual(anim);
        });
    });
});
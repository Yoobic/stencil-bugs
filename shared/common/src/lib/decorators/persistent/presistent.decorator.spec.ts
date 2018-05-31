import {
    Persistent
} from './persistent.decorator';

xdescribe('decorator: Persistent', () => {
    describe('sync mode', () => {
        it('Should persist a value ', () => {
            class DecoratorTest1 {
                @Persistent('synctest.item') public item: string = 'abc';
            }

            class DecoratorTest2 {
                @Persistent('synctest.item') public item: string;
            }
            let myTest1 = new DecoratorTest1();
            let value = 'aaa';
            //expect(myTest1.item).toEqual('abc'); //test for initial value
            myTest1.item = value;
            expect(myTest1.item).toEqual(value);
            let myTest2 = new DecoratorTest2();
            expect(localStorage.getItem('synctest.item')).toEqual(JSON.stringify(value));
            expect(myTest2.item).toEqual(value);
        });

        it('Should use decoratedPropertyName as the key', () => {
            class DecoratorTest3 {
                @Persistent() public testItem: string;
            }
            let myTest = new DecoratorTest3();
            let value = 'aaa';
            expect(localStorage.getItem('testItem')).toBeDefined();
            myTest.testItem = value;
            expect(localStorage.getItem('testItem')).toEqual(JSON.stringify(value));
            expect(myTest.testItem).toEqual(value);
        });

        it('Should persist an object', () => {
            class DecoratorTest1 {
                @Persistent('synctest.obj') public obj: object = {a: 'abc'};
            }

            class DecoratorTest2 {
                @Persistent('synctest.obj') public obj: object;
            }
            let myTest = new DecoratorTest1();
            let value = {
                a: 'aaa',
                b: 'bbb'
            };
            let myTest3 = new DecoratorTest1();
            expect(localStorage.getItem('synctest.obj')).toBeDefined();
            expect(myTest.obj).toEqual({a: 'abc'});
            myTest3.obj = value;
            expect(localStorage.getItem('synctest.obj')).toEqual(JSON.stringify(value));
            expect(myTest3.obj).toEqual(value);
            let myTest1 = new DecoratorTest2();
            expect(localStorage.getItem('synctest.obj')).toEqual(JSON.stringify(value));
            expect(myTest1.obj).toEqual(value);
        });
    });

    // localForage.config({
    //     driver: localForage.LOCALSTORAGE
    // });
});
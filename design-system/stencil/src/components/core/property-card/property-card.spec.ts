import { TestWindow } from '@stencil/core/testing';
import { YooPropertyCardComponent } from './property-card';

describe('PropertyCardComponent', () => {
    const propertiesColumns = [
        {
            'title': 'Chart title',
            'type': 'columns',
            'group': ['group1', 'group2'],
            'values': [
                {
                    'title': 'label column one',
                    'value': '4.1',
                    'isPercent': true,
                    'color': 'balanced'
                },
                {
                    'title': 'label column 2',
                    'value': '63,5/76',
                    'color': 'assertive'
                },
                {
                    'title': 'label column 3',
                    'value': '9.3',
                    'isPercent': true,
                    'color': 'assertive'
                },
                {
                    'title': 'label column 4',
                    'value': '82.9',
                    'isPercent': true,
                    'color': 'energized'
                }
            ]
        }
    ];
    const propertiesGrid = [
        {
            'title': 'Chart title',
            'type': 'grid',
            'group': ['group1', 'group2'],
            'headers': [
                'Column 1',
                'Column 2',
                'Column 3',
                'Column 4',
                'Column 5'
            ],
            'values': [
                {
                    'values': [
                        'Row 1',
                        'value 1',
                        'value 2',
                        'value 3',
                        null
                    ]
                },
                {
                    'values': [
                        'Row 2',
                        'value 1',
                        'value 2',
                        'value 3',
                        null
                    ]
                },
                {
                    'values': [
                        'Row 3',
                        'value 1',
                        'value 2',
                        'value 3',
                        'Ferm. Except info DC'
                    ],
                    'color': 'assertive'
                },
                {
                    'values': [
                        'Row 4',
                        'value 1',
                        'value 2',
                        'value 3',
                        null
                    ]
                },
                {
                    'values': [
                        'Row 5',
                        'value 1',
                        'value 2',
                        'value 3',
                        null
                    ]
                },
                {
                    'values': [
                        'Row 6',
                        'value 1',
                        'value 2',
                        'value 3',
                        null
                    ]
                },
                {
                    'values': [
                        'Row 7',
                        null,
                        null,
                        null,
                        null
                    ]
                }
            ]
        }
    ];
    const propertiesChart = [
        {
            'type': 'chart',
            'title': 'Chart Title',
            'group': ['group1', 'group2'],
            'config': {
                'chart': {
                    'plotBackgroundColor': null,
                    'plotBorderWidth': 0,
                    'plotShadow': false
                },
                'title': {
                    'text': 'Browser<br>shares<br>2015',
                    'align': 'center',
                    'verticalAlign': 'middle',
                    'y': 40
                },
                'tooltip': {
                    'pointFormat': '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                'plotOptions': {
                    'pie': {
                        'dataLabels': {
                            'enabled': true,
                            'distance': -50,
                            'style': {
                                'fontWeight': 'bold',
                                'color': 'red'
                            }
                        },
                        'startAngle': -90,
                        'endAngle': 90,
                        'center': [
                            '50%',
                            '75%'
                        ]
                    }
                },
                'series': [
                    {
                        'type': 'pie',
                        'name': 'Share',
                        'innerSize': '50%',
                        'data': [
                            [
                                'Value 1',
                                10.38
                            ],
                            [
                                'Value 2',
                                56.33
                            ],
                            [
                                'Value 3',
                                24.03
                            ],
                            [
                                'Value 4',
                                4.77
                            ],
                            [
                                'Value 5',
                                0.91
                            ],
                            {
                                'name': 'Proprietary or Undetectable',
                                'y': 0.2,
                                'dataLabels': {
                                    'enabled': false
                                }
                            }
                        ]
                    }
                ]
            }
        }
    ];
    const propertiesHtml = [
        {
            'title': 'Bloc title',
            'type': 'html',
            'group': ['group1', 'group2'],
            'value': '<center>This is a text</center>'
        }
    ];

    it('should build', () => {
        expect(new YooPropertyCardComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach(async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooPropertyCardComponent],
                html: '<yoo-property-card></yoo-property-card>'
            });
        });

        it('Should render', async () => {
            expect(element).toMatchSnapshot();
        });
        it('Should render as columns', async () => {
            element.properties = propertiesColumns;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render as grid', async () => {
            element.properties = propertiesGrid;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render as chart', async () => {
            element.properties = propertiesChart;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render as html', async () => {
            element.properties = propertiesHtml;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });
});
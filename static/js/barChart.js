window.onload = function() {
            var ctx = document.getElementById("canvas").getContext("2d");
            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100','101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116','117','118','119','120','121','122','123','124','125','126','127','128','129','130','131','132','133','134','135','136','137','138','139','140','141','142','143','144','145','146','147','148','149','150','151','152','153','154','155','156','157','158','159','160','161','162','163','164','165','166','167','168','169','170','171','172','173','174','175','176','177','178','179','180','181','182','183','184','185','186','187','188','189','190','191','192','193','194','195','196','197','198','199','200'],
                    datasets: [{
                        label: 'Variants',
                        data: [1050,1173,526,390,898,83,868,573,611,832,996,488,634,1012,971,575,921,329,1035,958,743,1099,853,1286,91,407,1067,1021,1043,726,219,1136,1125,56,948,724,815,676,471,316,660,1103,709,1083,739,290,204,339,1205,1027,1024,287,38,1058,1281,1184,15,1236,32,518,967,46,997,1039,449,1085,235,1077,198,791,855,862,472,1123,510,768,149,725,698,394,33,634,862,480,663,331,317,842,753,88,115,511,1197,464,723,1195,666,155,418,1078,997,532,1222,1281,1162,121,932,716,759,1130,311,1142,431,3,1164,510,1066,650,906,1087,1091,79,1014,166,64,256,1120,743,338,1255,1277,958,694,700,785,387,486,363,33,155,309,120,968,200,747,720,289,292,460,565,849,15,46,736,886,960,827,49,541,868,491,541,545,1114,189,1070,602,450,1000,618,920,728,279,940,894,893,491,987,1042,198,313,67,530,1060,119,1060,1065,1123,766,757,1141,47,66,1295,1068,1160,937,193,38,845]
                    }]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                        position: 'top',
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                show: true
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                show: false
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: 'Hello'
                    }
                }
            });

        };

        document.getElementById('randomizeData').addEventListener('click', function() {
            var zero = Math.random() < 0.2 ? true : false;
            barChartData.datasets.forEach(function(dataset) {
                dataset.data = dataset.data.map(function() {
                    return zero ? 0.0 : randomScalingFactor();
                });

            });
            window.myBar.update();
        });

        var colorNames = Object.keys(window.chartColors);
        document.getElementById('addDataset').addEventListener('click', function() {
            var colorName = colorNames[barChartData.datasets.length % colorNames.length];;
            var dsColor = window.chartColors[colorName];
            var newDataset = {
                label: 'User' + barChartData.datasets.length,
                backgroundColor: color(dsColor).alpha(0.5).rgbString(),
                borderColor: dsColor,
                borderWidth: 1,
                data: []
            };

            for (var index = 0; index < barChartData.labels.length; ++index) {
                newDataset.data.push(randomScalingFactor());
            }

            barChartData.datasets.push(newDataset);
            window.myBar.update();
        });

        document.getElementById('addData').addEventListener('click', function() {
            if (barChartData.datasets.length > 0) {
                var month = MONTHS[barChartData.labels.length % MONTHS.length];
                barChartData.labels.push(month);

                for (var index = 0; index < barChartData.datasets.length; ++index) {
                    //window.myBar.addData(randomScalingFactor(), index);
                    barChartData.datasets[index].data.push(randomScalingFactor());
                }

                window.myBar.update();
            }
        });

        document.getElementById('removeDataset').addEventListener('click', function() {
            barChartData.datasets.splice(0, 1);
            window.myBar.update();
        });

        document.getElementById('removeData').addEventListener('click', function() {
            barChartData.labels.splice(-1, 1); // remove the label first

            barChartData.datasets.forEach(function(dataset, datasetIndex) {
                dataset.data.pop();
            });

            window.myBar.update();
        });
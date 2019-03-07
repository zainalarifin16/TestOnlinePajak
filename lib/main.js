'use strict';

// console.log(taxSchema, list_profile);

window.taxcalculator = (function () {

    //SETTING TAX SCHEMA
    var taxSchema = [{
            min: 0,
            max: 50000000,
            tax: 5
        },
        {
            min: 50000000,
            max: 250000000,
            tax: 15
        },
        {
            min: 250000000,
            max: 500000000,
            tax: 25
        },
        {
            min: 500000000,
            max: null,
            tax: 30
        }
    ];

    //EXAMPLE USING ANOTHER SETTING
    // var taxSchema = [{
    //         min: 0,
    //         max: 50000000,
    //         tax: 5
    //     },
    //     {
    //         min: 50000000,
    //         max: 200000000,
    //         tax: 15
    //     },
    //     {
    //         min: 200000000,
    //         max: 500000000,
    //         tax: 25
    //     },
    //     {
    //         min: 500000000,
    //         max: null,
    //         tax: 30
    //     }
    // ];

    //SETTING TAX RELIEF
    var list_profile = [{
            tk0: {
                label: "Single",
                excludeTax: 54000000
            }
        },
        {
            k0: {
                label: "Married with no dependant",
                excludeTax: 58500000
            }
        },
        {
            k1: {
                label: "Married with 1 dependant",
                excludeTax: 63000000
            }
        },
        {
            k2: {
                label: "Married with 2 dependant",
                excludeTax: 67500000
            }
        },
        {
            k3: {
                label: "Married with 3 dependant",
                excludeTax: 72000000
            }
        },
    ];

    return {
        init: init
    }

    function calculateTax(taxAble, positionTaxSchema) {
        var taxIncome = 0;
        // console.log( taxAble.toLocaleString('en-US', {
        //     style: 'currency',
        //     currency: 'IDR',
        // }), taxSchema[positionTaxSchema].tax, positionTaxSchema, taxSchema[positionTaxSchema] );
        // console.log(positionTaxSchema);
        var leftTaxable = taxAble - (taxSchema[positionTaxSchema].max != null ? taxSchema[positionTaxSchema].max : taxSchema[positionTaxSchema].min);
        if (positionTaxSchema != (taxSchema.length - 1) && leftTaxable > 0) {
            taxIncome = (taxSchema[positionTaxSchema].max * taxSchema[positionTaxSchema].tax) / 100;
            // console.log( taxAble, taxSchema[positionTaxSchema].tax, ((taxSchema[positionTaxSchema].max * taxSchema[positionTaxSchema].tax) / 100).toLocaleString('en-US', {style: 'currency', currency: 'IDR' })  );
            positionTaxSchema++;
            taxIncome += calculateTax(leftTaxable, positionTaxSchema, taxSchema);
        } else {
            // console.log( taxAble, taxSchema[positionTaxSchema].tax, (taxAble * taxSchema[positionTaxSchema].tax) / 100  );
            taxIncome = (taxAble * taxSchema[positionTaxSchema].tax) / 100;
        }
        // console.log(taxIncome);
        return taxIncome;

    }

    function getUserRelief(selectedRelief) {
        var selected_relief = list_profile.filter(function (data, index) {
            // console.log( Object.keys(data)[0] , selectedRelief );
            return Object.keys(data)[0] == selectedRelief;
        });

        selected_relief = selected_relief[0][selectedRelief];

        return selected_relief;
    }

    function init() {
        var selectStatus = document.getElementById("status");
        // console.log(list_profile, list_profile);
        for (var index in list_profile) {
            var i = Object.keys(list_profile[index])[0];
            var e = list_profile[index][i];
            // console.log(index, e.label);
            selectStatus.options[selectStatus.options.length] = new Option(e.label, i);
        }

        var formCalculate = document.getElementById("formCalculate");
        formCalculate.addEventListener("submit", function (e) {
            e.preventDefault();
            var income = document.getElementById("income");
            var status = document.getElementById("status");
            var tb_income = document.getElementById("tb_income");
            var tb_annualincome = document.getElementById("tb_annualincome");
            var tb_taxrelief = document.getElementById("tb_taxrelief");
            var tb_taxableincome = document.getElementById("tb_taxableincome");
            var tb_taxincome = document.getElementById("tb_taxincome");
            var tb_taxincomemonthly = document.getElementById("tb_taxincomemonthly");

            var userReliefTax = getUserRelief(status[status.selectedIndex].value),
            valIncome = income.value,
            valAnnualIncome = valIncome * 12,
            valTaxRelief = userReliefTax.excludeTax,
            valTaxable = valAnnualIncome - valTaxRelief,
            valTaxIncome = calculateTax(valTaxable, 0),
            valTaxIncomeMonthly = valTaxIncome / 12;


            //display to view

            tb_income.value = valIncome.toLocaleString('en-US', {
                style: 'currency',
                currency: 'IDR',
            });

            tb_annualincome.value = valAnnualIncome
                .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'IDR',
                });
            tb_taxrelief.value = valTaxRelief
                .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'IDR',
                });
            tb_taxableincome.value = valTaxable
                .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'IDR',
                });
            tb_taxincome.value = valTaxIncome
                .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'IDR',
                });;

            tb_taxincomemonthly.value = valTaxIncomeMonthly
                .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'IDR',
                });;

        });
    }

})();
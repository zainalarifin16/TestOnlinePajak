'use strict';

/*
 * Unit tests for lib/calculator.js
 */

describe('Tax Calculator', function() {

  // API for interacting with the page.
  var controls =  {
    get income() {
        return document.getElementById('income').value;
    },
    set income(val) {
        document.getElementById('income').value = val;
    },
    get status() {
        return document.getElementById('status').value;
    },
    set status(val) {
        document.getElementById('status').value = val;
    },
    get tbIncome(){
        return document.getElementById("tb_income").value;
    },
    get tbAnnualIncome(){
        return document.getElementById("tb_annualincome").value;
    },
    get tb_taxrelief(){
        return document.getElementById("tb_taxrelief").value;
    },
    get tb_taxableincome(){
        return document.getElementById("tb_taxableincome").value;
    },
    get tb_taxincome(){
        return document.getElementById("tb_taxincome").value;
    },
    get tb_taxincomemonthly(){
        return parseFloat(document.getElementById("tb_taxincomemonthly").value).toFixed(2);
    },
    clickCalculate: function() {
      document.getElementById('calculate').click();
    }
  };

  // inject the HTML fixture for the tests
  beforeEach(function() {
    // Why this line? See: https://github.com/billtrik/karma-fixture/issues/3
    fixture.base = 'test';
    fixture.load('main.fixture.html');

    // init js lib
    window.taxcalculator.init();
  });

  // remove the html fixture from the DOM
  afterEach(function() {
    fixture.cleanup();
  });

  it('should tax calculate Income : 25000000 ; Annual Income : 300000000 ; Tax Relief : 54000000 ; Taxable Income : 246000000 ; Tax Income : 31900000 ; Tax Income Monthly : 2658333.33 for income 25000000 with statue single', function() {
    controls.income = 25000000;
    controls.status = "tk0";
    controls.clickCalculate();
    controls.tbIncome.should.equal('25000000');
    controls.tbAnnualIncome.should.equal('300000000');
    controls.tb_taxrelief.should.equal('54000000');
    controls.tb_taxableincome.should.equal('246000000');
    controls.tb_taxincome.should.equal('31900000');
    controls.tb_taxincomemonthly.should.equal('2658333.33');
  });

  it('should tax calculate Income : 30000000 ; Annual Income : 360000000 ; Tax Relief : 58500000 ; Taxable Income : 301500000 ; Tax Income : 40375000 ; Tax Income Monthly : 3364583.33 for income 30000000 with statue single', function() {
    controls.income = 30000000;
    controls.status = "k0";
    controls.clickCalculate();
    controls.tbIncome.should.equal('30000000');
    controls.tbAnnualIncome.should.equal('360000000');
    controls.tb_taxrelief.should.equal('58500000');
    controls.tb_taxableincome.should.equal('301500000');
    controls.tb_taxincome.should.equal('40375000');
    controls.tb_taxincomemonthly.should.equal('3364583.33');
  });
  
  it('should tax calculate Income : 50000000 ; Annual Income : 600000000 ; Tax Relief : 63000000 ; Taxable Income : 537000000 ; Tax Income : 99250000 ; Tax Income Monthly : 8270833.33 for income 50000000 with statue single', function() {
    controls.income = 50000000;
    controls.status = "k1";
    controls.clickCalculate();
    controls.tbIncome.should.equal('50000000');
    controls.tbAnnualIncome.should.equal('600000000');
    controls.tb_taxrelief.should.equal('63000000');
    controls.tb_taxableincome.should.equal('537000000');
    controls.tb_taxincome.should.equal('99250000');
    controls.tb_taxincomemonthly.should.equal('8270833.33');
  });

});
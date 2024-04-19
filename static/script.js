const ctx = document.getElementById('stockChart').getContext('2d');
let lastY = 1000;
let money = 1500;
let course = 1500;
let bit = 0;

var name = localStorage.getItem("name")

let buyBtn = document.querySelector(".buy")

let sellBtn = document.querySelector(".sale")

let yourMoney = document.querySelector("#yourMoney")

let bitEmil = document.querySelector("#EmilCoin")

let currentRate = document.querySelector("#currentRate")

function moneyCount(){
    if(money >= lastY * 1.5){
        money-=course;
        money = money.toFixed(2);
        bit += 1;
        bitEmil.innerHTML = `EmilCoin: ${bit}`;
        yourMoney.innerHTML = `Ваши деньги: $${money}`
    }
}

function bitSale(){
    if(bit >= 1){
        bit -= 1;
        bitEmil.innerHTML = `EmilCoin: ${bit}`;
        money = (parseFloat(course) + parseFloat(money)).toFixed(2);
        yourMoney.innerHTML = `Ваши деньги: $${money}`;
    }
}

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Stock Price',
            data: [{x: 0, y: lastY}],
            borderColor: 'rgba(0, 200, 0, 1)',
            borderWidth: 2,
            fill: false,
            segment: {
                borderColor: ctx => {
                    return ctx.p0.parsed.y < ctx.p1.parsed.y ? 'rgba(0, 200, 0, 1)' : 'rgba(255, 0, 0, 1)';
                }
            }
        }]
    },
    options: {
        animations: {
            y: {
                duration: 0
            }
        },
        scales: {
            x: {
                type: 'linear',
                display: true,
                suggestedMin: 0,
                suggestedMax: 50,
                ticks: {
                    display: false
                }
            },
            y: {
                display: true,
                suggestedMin: 500,
                suggestedMax: 1500,
                ticks: {
                    display: false
                }
            }
        },
        elements: {
            line: {
                tension: 0
            },
            point: {
                radius: 0
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

let dataIndex = 1;

function updateChart() {
    const maxYChange = 100;
    const minY = 500;
    const maxY = 1500;
    const newY = Math.max(minY, Math.min(maxY, lastY + (Math.random() * (maxYChange * 2) - maxYChange)));
    chart.data.datasets[0].data.push({x: dataIndex++, y: newY});
    document.getElementById('currentRate').innerText = `Текущий курс: $${(newY* 1.5).toFixed(2)}`;
    lastY = newY;
    chart.update();
    course = (newY* 1.5).toFixed(2)


    if (dataIndex > 50) {
        chart.data.datasets[0].data = [{x: 0, y: 1000}];
        dataIndex = 1;
        lastY = 1000;
    }
}

buyBtn.addEventListener("click",()=> moneyCount());

sellBtn.addEventListener("click",()=>bitSale());

setInterval(updateChart, 1000);


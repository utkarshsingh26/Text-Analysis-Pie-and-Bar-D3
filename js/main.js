let vowelCount = 0;
let consonantCount = 0;
let punctuationCount = 0;
let textValueActualLength = 0;
const width = 580;
const height = 400;
const radius = Math.min(width, height) / 2.5;
const color = d3.scaleOrdinal(d3.schemeSet3);
let donutObject = {};
let individualVowels = {'a': 0, 'e' : 0, 'i' : 0, 'o' : 0, 'u' : 0, 'y' : 0};
let individualPunctuations = {'.' : 0, ',' : 0, '?' : 0, '!' : 0, ':' : 0, ';' : 0};

let individualConsonants = {
  'b': 0,
  'c': 0,
  'd': 0,
  'f': 0,
  'g': 0,
  'h': 0,
  'j': 0,
  'k': 0,
  'l': 0,
  'm': 0,
  'n': 0,
  'p': 0,
  'q': 0,
  'r': 0,
  's': 0,
  't': 0,
  'v': 0,
  'w': 0,
  'x': 0,
  'z': 0
};

let allCharacters = {};

let allEncompassingArray = [];

const margin = { top: 20, right: 30, bottom: 40, left: 50 };
let barChartWidth = 580-margin.left-margin.right;
let barChartHeight = 400-margin.top-margin.bottom;
let spacing = 0.25;

function getKeys(data){

  let answer;

  if(data.index == 0){
    answer = 'consonants: ' + data.data;
  } else if(data.index == 2){
    answer = 'punctuations: ' + data.data;
  } else if(data.index == 1){
    answer = 'vowels: ' + data.data;
  }

  return answer

}

function submitText(){

/** Redeclaring the global variables again here because they were not being resent everytime submit button was being hit (start)*/

  vowelCount = 0;
  consonantCount = 0;
  punctuationCount = 0;
  textValueActualLength = 0;
  donutObject = {};
  individualVowels = {'a': 0, 'e' : 0, 'i' : 0, 'o' : 0, 'u' : 0, 'y' : 0};
  individualPunctuations = {'.' : 0, ',' : 0, '?' : 0, '!' : 0, ':' : 0, ';' : 0};
  individualConsonants = {
      'b': 0,
      'c': 0,
      'd': 0,
      'f': 0,
      'g': 0,
      'h': 0,
      'j': 0,
      'k': 0,
      'l': 0,
      'm': 0,
      'n': 0,
      'p': 0,
      'q': 0,
      'r': 0,
      's': 0,
      't': 0,
      'v': 0,
      'w': 0,
      'x': 0,
      'z': 0
  };
  allCharacters = {};
  allEncompassingArray = [];


  /** Redeclaring the global variables again here because they were not being resent everytime submit button was being hit (end)*/

    var textValue = document.getElementById("wordbox").value;
    textValue = textValue.toLowerCase()

    let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U', 'y', 'Y'];
    let punctuations = ['.', ',', '?', '!', ':', ';'];

    for(let i=0; i<textValue.length; i++){
        if(textValue[i] != '' && textValue[i] != ' '){
            textValueActualLength++;
        }
    }

    for(let i=0; i<textValue.length; i++){
        for(let j=0; j<vowels.length; j++){
            if(textValue[i] == vowels[j] && (textValue[i] != '' && textValue[i] != ' ')){
              if(textValue[i] in individualVowels){
                individualVowels[textValue[i]]++;
              }
                vowelCount++;
            }
        }
    }

    for(let i=0; i<textValue.length; i++){
        for(let j=0; j<punctuations.length; j++){
            if(textValue[i] == punctuations[j] && (textValue[i] != '' && textValue[i] != ' ')){
              if(textValue[i] in individualPunctuations){
                individualPunctuations[textValue[i]]++;
              }
                punctuationCount++;
            }
        }
    }

    for(let i=0; i<textValue.length; i++){
      if(textValue[i] in individualConsonants){
        individualConsonants[textValue[i]]++;
      }
  }

    consonantCount = textValueActualLength - vowelCount - punctuationCount;

    donutObject["consonants"] = consonantCount
    donutObject["punctuations"] = punctuationCount;
    donutObject["vowels"] = vowelCount;
    // donutObject["textValueActualLength"] = textValueActualLength;
    
    allCharacters ={...individualVowels,...individualConsonants,...individualPunctuations};

    allEncompassingArray[0] = donutObject;
    allEncompassingArray[1] = individualConsonants;
    allEncompassingArray[2] = individualPunctuations;
    allEncompassingArray[3] = individualVowels;

    console.log(individualConsonants,individualVowels,individualPunctuations)

    clearDonutChart();
    drawDonutChart();

    
}

function drawDonutChart(){


  const svg = d3.select("#pie_svg")
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`);

  svg.selectAll("*").remove();

const color = d3.scaleOrdinal(d3.schemeSet3);

const pie = d3.pie()
  .value(d => d);

const pieData = pie(Object.values(allEncompassingArray[0]));
// console.log(pieData,"<=====")

const arc = d3.arc()
  .innerRadius(radius * 0.5)
  .outerRadius(radius);

const arcs = svg.selectAll(".arc")
  .data(pieData)
  .enter()
  .append("g")
  .attr("class", "arc");

arcs.append("path")
  .attr("d", arc)
  .attr("stroke", "black")
  .attr("stroke-width", 1)
  .attr("fill", (d, i) => color(Object.keys(donutObject)[i])) 
  .on("mouseover", function(d,i){
    d3.select(this)
    .attr("stroke", "black")
    .style("stroke-width", 4)

    svg.append('text')
    .attr('text-anchor','middle')
    .attr('id', 'center-text')
    .text(getKeys(i))
  })
  .on("mouseout", function(d){
    d3.select(this)
      .style('stroke-width','1')
      d3.select('#center-text').remove()
  })
  .on('click', (d,i) => {
    // console.log(i)
    drawBarChart(i)
  }) 

}

function drawBarChart(data){

  if(data.index == 0){
    // draw consonants

  let max = d3.max(Object.values(individualConsonants));
  // console.log(max);

  let barChartSvg = d3.select('#bar_svg')
                        .attr('width', barChartWidth)
                        .attr('height', barChartHeight)

                        barChartSvg.selectAll("*").remove();

  let g = barChartSvg.append('g')
              .attr('transform', `translate(${margin.left},${margin.top})`);

  const yScale = d3.scaleLinear()
                  //  .domain([0,data.data])
                   .domain([0,max])
                   .nice()
                   .range([barChartHeight,0])
                   
                   g.append('g')
                   .call(d3.axisLeft(yScale));

  
  const xScale = d3.scaleBand()
                    .domain(Object.keys(individualConsonants))
                    .range([0,barChartWidth])
                    .paddingInner(0.1)

                    g.append('g')
                      .attr('transform', `translate(0,${barChartHeight})`)
                      .call(d3.axisBottom(xScale))

                      g.selectAll(".bars")
                      .data(Object.entries(individualConsonants))
                      .enter()
                      .append("rect")
                        .attr("x", function(d) { return xScale(d[0]); })
                        .attr("y", function(d) { return yScale(d[1]); })
                        .attr("width", xScale.bandwidth())
                        .attr("height", function(d) { return barChartHeight - yScale(d[1]); })
                        .attr("fill", "#8dd3c7") // color has been manually taken from d3 schemeset to match the donut chart
                        .on('mouseover', (event, d) => {
                          drawToolTip(event, d);
                         overWriteBarDiv(d);
                        })
                        .on('mouseout', () => {
                          clearToolTip();
                          originalStateBarDiv();
                        })

                    

  } else if(data.index == 1){
  
    //draw vowels

    let max = d3.max(Object.values(individualVowels));

    let barChartSvg = d3.select('#bar_svg')
                        .attr('width', barChartWidth)
                        .attr('height', barChartHeight)

                        barChartSvg.selectAll("*").remove();

  let g = barChartSvg.append('g')
              .attr('transform', `translate(${margin.left},${margin.top})`);

  const yScale = d3.scaleLinear()
                  //  .domain([0,data.data])
                   .domain([0,max])
                   .nice()
                   .range([barChartHeight,0]) 
                   
                   g.append('g')
                   .call(d3.axisLeft(yScale));

  
  const xScale = d3.scaleBand()
                    .domain(Object.keys(individualVowels))
                    .range([0,barChartWidth])
                    .paddingInner(0.1)

                    g.append('g')
                      .attr('transform', `translate(0,${barChartHeight})`)
                      .call(d3.axisBottom(xScale))

                      g.selectAll(".bars")
                      .data(Object.entries(individualVowels))
                      .enter()
                      .append("rect")
                        .attr("x", function(d) { return xScale(d[0]); })
                        .attr("y", function(d) { return yScale(d[1]); })
                        .attr("width", xScale.bandwidth())
                        .attr("height", function(d) { return barChartHeight - yScale(d[1]); })
                        .attr("fill", "#bebada") // color has been manually taken from d3 schemeset to match the donut chart
                        .on('mouseover', (event, d) => {
                          drawToolTip(event, d);
                          overWriteBarDiv(d);
                        })
                        .on('mouseout', () => {
                          clearToolTip();
                          originalStateBarDiv();
                        })



 



  } else if(data.index == 2){
    //draw punctuations

  let max = d3.max(Object.values(individualPunctuations));

    let barChartSvg = d3.select('#bar_svg')
                        .attr('width', barChartWidth)
                        .attr('height', barChartHeight)

                        barChartSvg.selectAll("*").remove();

  let g = barChartSvg.append('g')
              .attr('transform', `translate(${margin.left},${margin.top})`);

  const yScale = d3.scaleLinear()
                  //  .domain([0,data.data])
                   .domain([0,max])
                   .nice()
                   .range([barChartHeight,0]) 
                   
                   g.append('g')
                   .call(d3.axisLeft(yScale));

  
  const xScale = d3.scaleBand()
                    .domain(Object.keys(individualPunctuations))
                    .range([0,barChartWidth])
                    .paddingInner(0.1)

                    g.append('g')
                      .attr('transform', `translate(0,${barChartHeight})`)
                      .call(d3.axisBottom(xScale))

                      g.selectAll(".bars")
                      .data(Object.entries(individualPunctuations))
                      .enter()
                      .append("rect")
                        .attr("x", function(d) { return xScale(d[0]); })
                        .attr("y", function(d) { return yScale(d[1]); })
                        .attr("width", xScale.bandwidth())
                        .attr("height", function(d) { return barChartHeight - yScale(d[1]); })
                        .attr("fill", "#ffffb3") // color has been manually taken from d3 schemeset to match the donut chart
                        .on('mouseover', (event, d) => {
                          drawToolTip(event, d);
                         overWriteBarDiv(d);
                        })
                        .on('mouseout', () => {
                          clearToolTip();
                          originalStateBarDiv();
                        })



  }

}

function drawToolTip(event, data) {

  const tooltip = d3.select('#tooltip');
  tooltip.style('display', 'block')
          .style('left', `${event.pageX}px`)
          .style('top', `${event.pageY}px`)
          .html(`<strong>character</strong>: ${data[0]} <br> <strong>count</strong>: ${data[1]}`)
}

function clearToolTip() {
  const tooltip = d3.select('#tooltip');
  tooltip.style('display', 'none');
}

function overWriteBarDiv(data) {

  const overWrite1 = document.getElementById('character-name');
  overWrite1.innerHTML = `${data[1]}`;

  const overWrite2 = document.getElementById('my_span');
  overWrite2.innerHTML = `${data[0]} is `;

}

function originalStateBarDiv(){

  const ogWrite1 = document.getElementById('character-name');
  ogWrite1.innerHTML = 'NONE';

  const ogWrite2 = document.getElementById('my_span');
  ogWrite2.innerHTML = 'selected character';

}

function clearBarChart(){
  let prevSvg = d3.select('#bar_svg');
  prevSvg.selectAll("*").remove();
}

function clearDonutChart(){
  let prevSvg = d3.select('#pie_svg');
  prevSvg.selectAll("*").remove();
}

      
        async function drawChart () {
        console.log('updated');

        let url = 'https://api.thingspeak.com/channels/1527808/feeds.json?results=20';

        const fetchResult = await fetch(url);
        const jsonResult = await fetchResult.json();
        const feedsResult = jsonResult.feeds; 

        let editRows = [['Viikonpäivä', 'Lämpötila', 'Ilmankosteus']];

        for (const i in feedsResult) {
         //editRows.push([feedsResult[i].created_at, parseInt(feedsResult[i].field1.split('.')[0]),34])                   //+= " " + feedsResult[i].field1.split ('.', 1); 
         editRows.push([feedsResult[i].created_at, parseInt(feedsResult[i].field1.split('.')[0])])
        }

        document.getElementById("resultTable").innerHTML = editRows;

        var data = google.visualization.arrayToDataTable(editRows);

        var options = {
          title: 'Ilman lampotila',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('lampotila'));

        chart.draw(data, options);

        setTimeout(function(){ drawChart() }, 3000);


      }
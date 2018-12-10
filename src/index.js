const data = {
    totalHeight:1440,
    minuteHeight:2,
    totalWidth:600,
    meetings:[
        { id: "New", start: 60, end: 120 },
        { id: "New 1", start: 150, end: 270 },
        { id: "New 2", start: 240, end: 300 },
        { id: "New 3", start: 200, end: 360 },
        { id: "New 4", start: 180, end: 330 },
    ]
}
var getWidth = function(numberOfMeetings){
    const { totalWidth } = data;
    return totalWidth/numberOfMeetings;
}

function checkConflict(meetingOne, meetingtwo) {
    return meetingOne.end > meetingtwo.start && meetingOne.start < meetingtwo.end;
}
  
function setNumberOfMeetings(meetingArr) {
    for (var i = 0; i < meetingArr.length; i++) {
        meetingArr[i].eventsCount = 0;
        meetingArr[i].leftPos = 0;
        for (var j = 0; j < meetingArr.length; j++) {
            if (checkConflict(meetingArr[i], meetingArr[j])) {
                meetingArr[i].eventsCount += 1;
                meetingArr[i].leftPos = i > 0 ? i-1 : 0;
            }
        }
    }
    return meetingArr;
}

var getElePostion = function(start,end){
    const topValue = start*2;
    const heightValue = (end - start)*2;;
    return{
        top:topValue,
        height:heightValue
    }
} 

var createMeetings = function(){
    let meetingHtml = '';
    const {meetings, totalWidth} = data;
    const updatedMeetings = setNumberOfMeetings(meetings);
    console.log(updatedMeetings);
    for(var i in updatedMeetings){
        //console.log(data.meetings[i]);
        const {id, start, end, eventsCount, leftPos} = updatedMeetings[i];
        const position = getElePostion(start, end);
        //console.log(position);
        meetingHtml += '<span class="meeting-ele" style="height:'+position.height+'px;top:'+position.top+'px; width:'+totalWidth/eventsCount+'px; left:'+(totalWidth/eventsCount)*leftPos+'px">'+id+'</span>';
    }
    return meetingHtml;
}

var injectMeetings = function(){
    var main = document.getElementById('meetings');
    main.innerHTML = createMeetings();
}
console.log(injectMeetings());
 
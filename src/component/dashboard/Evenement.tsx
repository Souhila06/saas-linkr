import React from "react";
import Sidenav from './Sidenav';
import MuiDrawer from '@mui/material/Drawer';
import { Box, Typography } from "@mui/material";
import Navdahboard from "./Navdahboard";
import dayGridPlugin from "@fullcalendar/daygrid";
import timGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { EventContentArg } from '@fullcalendar/core';
import { EventClickArg } from '@fullcalendar/core';
import { DateSelectArg } from '@fullcalendar/core';
import { EventApi } from '@fullcalendar/core';
import allLocales from "@fullcalendar/core/locales-all";
let id=0;
export default function Evenement() {
  const [events,setEvents]=React.useState<Array<EventApi>>([])
  const [initialEvents,setInitialEvents]=React.useState([
    {
      id: String(10001),
      title: "Hello world",
      start: new Date().toISOString().split("T")[0],
    },
    { 
      id: String(10002),  
      title: "Hello world",
      start: new Date().toISOString().split("T")[0] + "T14:05:00",
    }
  ]) 
  React.useEffect (()=>{
    console.log("evennt",events)
  },[events])
  const handleEvents =(events:EventApi[])=>{
    setEvents(events)
  }
  const renderEventContent = (eventContent: EventContentArg) => {
    return (
     
      <>
     
      <b>{eventContent.timeText}</b>
      <b style={{color:'red'}}>{eventContent.event.title}</b>
      </>
    )
  };
  const handleEventClick = (clickInfo: EventClickArg) => {
    alert(`Event cliqué ${clickInfo.event.title}`);
    clickInfo.event.remove()
  };
  const handleDateSelect= (selecInfo:DateSelectArg)=>{
    let title=prompt("Event");
    let calenderApi= selecInfo.view.calendar
    calenderApi.unselect()
    if(title){
      calenderApi.addEvent({
        id:String(id++),
        title,
        start:selecInfo.startStr,
        end:selecInfo.endStr,
        allDay:selecInfo.allDay
      })
    }
  }
 
  return (
    <>
      <Navdahboard/>
      <Sidenav/>
      <div style={{ position: 'relative', left: '240px', width: 'calc(100% - 240px)', marginTop: '64px', padding:'20px' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timGridPlugin, interactionPlugin]}
          customButtons={{
            btn: {
              text: "Button Text",
              click(ev: MouseEvent, element: HTMLElement) {
                alert("button restaur");
              }
            }
          }}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          initialEvents={initialEvents}
          headerToolbar={{
            left:"prev,next,today btn" ,
            center:"title",
            right:"dayGridMonth,timeGridWeek,timeGridDay btn"
          }}
          initialView="dayGridMonth"
          selectable={true}
          editable={true}
          eventsSet={handleEvents}
          dayMaxEvents={true}
          weekends={true}
          locales={allLocales}
          firstDay={1}
          locale={"fr"}
          buttonText={{
            day:"day",
            prev:"prev",
            nextYear:"next year",
            prevYear:"prev year",
            next:"next",
            month:"month",
            today:"today",
            week:"week"
          }}
        />
      </div>
    </>
  );
}
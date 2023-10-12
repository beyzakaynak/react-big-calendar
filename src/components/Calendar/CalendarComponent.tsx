import React, { Children, useState,useCallback } from "react";
import { Calendar, SlotInfo, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { luxonLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "primereact/dialog";
import { Button} from 'primereact/button';
import { DateTime} from 'luxon'
import { Calendar as PrimeCalendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

const localizer = luxonLocalizer(DateTime);
// You can choose your localizer
//const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
export const CalendarComponent = () => {
    const events = [
        {
            start: new Date("Fri Oct 13 2023 20:53:54 GMT+0300 (GMT+03:00)"),
            end: new Date ("Fri Oct 13 2023 20:53:54 GMT+0300 (GMT+03:00)"),
            title: 'meeting',
          },
    ]

    const holiDays = [
        {
            start: {
                day: 14,
                month: 9,
                year: 2023
            },
            end: {
                day: 15,
                month: 9,
                year: 2023
            }
        },
    ]

    const [newEvent, setNewEvent] = useState({ start:new Date(), end:new Date(), title: "" });
    const [allEvents, setAllEvents] = useState(events);
    const [showEvent, setShowEvent] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [view, setView] = useState(Views.MONTH);
    const [date, setDate] = useState(new Date());


    const handleAddEvent = () => {
      setAllEvents([...allEvents, newEvent])
    }

    const modalFooter = () => {
        return (
            <div>
                <Button
                    label="close modal"
                    onClick={() => setShowDialog(false)}
                />
            </div>
        )
    }
    const ColoredDateCellWrapper: React.ComponentType = (deneme: any) => {
        return React.cloneElement(Children.only(deneme.children), {
            style: {
                ...deneme.children.style,
                backgroundColor: control(deneme.value),
            },
        });

    }

    const control = (value:any) => {
        const a = holiDays.map(holiday => {
            if (
                (holiday.start.day === value.getDate() || holiday.end.day === value.getDate()) &&
                (holiday.start.month === value.getMonth() || holiday.end.month === value.getMonth()) &&
                (holiday.start.year === value.getFullYear() || holiday.end.year === value.getFullYear())
            ) {
                return 'lightgrey'
            } else {
                return ''
            }
        })

        return a.includes('lightgrey') ? 'lightgrey' : '';
    }

    const onView = useCallback((newView:any) => setView(newView), [setView]);
    const onNavigate = useCallback((newDate:any) => setDate(newDate), [setDate])

    return (
        <div style={{
            margin: "7%"
        }}>
            <div className="card">

                <Dialog
                    header="New Event"
                    visible={showDialog}
                    style={{ width: "50vw" }}
                    footer={modalFooter}
                    onHide={() => setShowDialog(false)}
                >
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Dialog>

                <Dialog
                    header="Event Details"
                    visible={showEvent}
                    style={{ width: "50vw" }}
                    footer={modalFooter}
                    onHide={() => setShowEvent(false)}
                >
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Dialog>

                <h1>Calendar</h1>
                <h2>Add New Event</h2>
                <div>
                  <InputText value={newEvent.title} onChange={(e:any) => setNewEvent({...newEvent, title: e.target.value })}  />
                  <div></div>
                  <PrimeCalendar  value={newEvent.start} placeholder="Start Date" onChange={(start:any) => setNewEvent({...newEvent, start:start.value})} showIcon />
                  <div></div>
                  <PrimeCalendar value={newEvent.end} placeholder="End Date" onChange={(end:any) => setNewEvent({...newEvent, end:end.value})} showIcon />
                  <div></div>
                    <Button label="Add Event" onClick={handleAddEvent} />
                </div>
                <DnDCalendar
                    date={date}
                    onView={onView}
                    view={view}
                    onNavigate={onNavigate}
                    events={allEvents}
                    localizer={localizer}
                    resizable
                    style={{ height: "100vh" }}
                    selectable={true}
                    onDoubleClickEvent={event => {
                        setShowEvent(true);
                    }}
                    onSelectSlot={(slotInfo: SlotInfo) => {
                        onView(Views.DAY)
                        onNavigate(slotInfo.start)
                    }}
                    components={{
                        dateCellWrapper: ColoredDateCellWrapper,
                    }}


                />


            </div>

        </div>
    );

}

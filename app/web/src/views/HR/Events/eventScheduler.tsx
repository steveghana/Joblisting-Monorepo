// import logo from "./logo.svg";
// // import "./Scheduler.css";
// // import {
// //   useSession,
// //   useSupabaseClient,
// //   useSessionContext,
// // } from "@supabase/auth-helpers-react";
// // import { createClient } from "@supabase/supabase-js";
// // import { SessionContextProvider } from "@supabase/auth-helpers-react";
// import { useState } from "react";
// import { DateTimePicker } from "@mui/x-date-pickers";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import EventForm from "./createEvent";
// import Demo from "./demo";

// // const supabase = createClient(
// //   "https://ctlqfkiziycvlfmfrojv.supabase.co",
// //   "YOUR_SUPABASE_KEY"
// // );

// function Scheduler() {
//   const [start, setStart] = useState(new Date());
//   const [end, setEnd] = useState(new Date());
//   const [eventName, setEventName] = useState("");
//   const [eventDescription, setEventDescription] = useState("");

//   // const session = useSession();
//   // const supabase = useSupabaseClient();
//   // const { isLoading } = useSessionContext();

//   // const handleGoogleSignIn = async () => {
//   //   const { error } = await supabase.auth.signInWithOAuth({
//   //     provider: "google",
//   //     options: {
//   //       scopes: "https://www.googleapis.com/auth/calendar",
//   //     },
//   //   });
//   //   if (error) {
//   //     console.error(
//   //       "Error logging in to Google provider with Supabase:",
//   //       error
//   //     );
//   //     toast.error("Failed to sign in with Google.");
//   //   }
//   // };

//   const handleSignOut = async () => {
//     // await supabase.auth.signOut();
//   };

//   const createCalendarEvent = async () => {
//     console.log("Creating calendar event");
//     {

//     const event = {
//       summary: eventName,
//       description: eventDescription,
//       start: {
//         dateTime: start.toISOString(),
//         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       },
//       end: {
//         dateTime: end.toISOString(),
//         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       },
//       attendees: [
//     {email: "john@example.com"},
//     {email: "jane@example.com"},
//     {email: "your-email@example.com"} // You can include or exclude yourself
//   ]
// }
//     };
//     try {
//       const response = await fetch(
//         "https://www.googleapis.com/calendar/v3/calendars/primary/events",
//         {
//           method: "POST",
//           headers: {
//             // Authorization: "Bearer " + session.provider_token,
//           },
//           body: JSON.stringify(event),
//         }
//       );
//       const data = await response.json();
//       console.log(data);
//       toast.success("Event created, check your Google Calendar!");
//     } catch (error) {
//       console.error("Error creating calendar event:", error);
//       toast.error("Failed to create the event. Please try again.");
//     }
//   };

//   return (
//     <div className="App">
//       <div style={{ margin: "30px auto" }}>
//         {/* {session ? ( */}
//         <>
//           <Demo />
//           {/* <h2>Hey there {session.user.email}</h2> */}
//           <p>Start of your event</p>
//           <DateTimePicker onChange={setStart} value={start} />
//           <p>End of your event</p>
//           <DateTimePicker onChange={setEnd} value={end} />
//           <p>Event name</p>
//           <input type="text" onChange={(e) => setEventName(e.target.value)} />
//           <p>Event description</p>
//           <input
//             type="text"
//             onChange={(e) => setEventDescription(e.target.value)}
//           />
//           <hr />
//           <button onClick={() => createCalendarEvent()}>
//             Create Calendar Event
//           </button>
//           <p></p>
//           <button onClick={() => handleSignOut()}>Sign Out</button>
//         </>
//         {/* ) : (
//           <>
//             <button onClick={() => handleGoogleSignIn()}>
//               Sign In With Google
//             </button>
//           </>
//         )} */}
//       </div>
//     </div>
//   );
// }

// export default Scheduler;

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { fs } from "../../../Firebase/firebase.config";

const auth = getAuth();

export default function Chats() {
  const messageEndRef = useRef(null);
  const currentUserId = auth.currentUser.uid;
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [volunteer, setVolunteer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 300 });
    auth.onAuthStateChanged((volunteer) => {
      if (volunteer) {
        setVolunteer(volunteer);

        onSnapshot(query(collection(fs, "volunteers")), (querySnapshot) => {
          const usersInfo = [];
          querySnapshot.forEach((doc) => {
            const userInfo = {
              uid: doc.data().uid,
              name: doc.data().name,
              email: doc.data().email,
              phone: doc.data().phone,
              address: doc.data().address,
              imageRef: doc.data().imageRef,
              availableArea: doc.data().availableArea,
            };

            usersInfo.push(userInfo);
            setUsers(usersInfo);
          });
        });
      }
    });
  }, [selectedUser]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    console.log("selected user : ", user);
  };
  const handleEmojiSelect = (emoji) => {
    setNewMessage(newMessage + emoji.native);
  };

  const handleSendMessage = async () => {
    if (selectedUser && newMessage.trim() !== "") {
      const chatRoomId = [currentUserId, selectedUser.uid].sort().join("_");

      const messageData = {
        text: newMessage,
        sender: currentUserId,
        timestamp: serverTimestamp(),
        senderName: auth.currentUser.displayName,
        receiverName: selectedUser.name,
        senderPhoto: auth.currentUser.photoURL,
        receiverPhoto: selectedUser.imageRef,
      };

      const messagesRef = collection(fs, "chats", chatRoomId, "messages");
      await addDoc(messagesRef, messageData);

      setNewMessage("");
      setShowEmojiPicker(false);
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const chatRoomId = [currentUserId, selectedUser.uid].sort().join("_");

    onSnapshot(
      query(
        collection(fs, "chats", chatRoomId, "messages"),
        orderBy("timestamp", "asc")
      ),
      (querySnapshot) => {
        let mes = [];
        querySnapshot.forEach((doc) => {
          let messageInfo = doc.data();
          mes.push(messageInfo);
        });

        setMessages(mes);
      }
    );
  }, [selectedUser]);

  return (

    <div className="p-2 m-4   max-h-100  bg-slate-900 " data-aos="fade-in">
      <div className="flex w-full min-h-full p-2">
        <div className="w-5/12 bg-slate-800 rounded p-2">

          <div className="">
            <div className="flex items-center space-x-4 p-2 mb-5 ">
              <div className="avatar me-2">
                <div className="w-12 rounded-full">
                  <img src={auth.currentUser.photoURL} />
                </div>
              </div>
              <h4 className="font-semibold text-lg text-white capitalize font-poppins tracking-wide">
                {auth.currentUser.displayName}
              </h4>
            </div>
          </div>
          <ul
            className="space-y-1 text-sm  text-white h-[400px] "
            style={{ overflowY: "scroll" }}
          >
            {users
              .filter((user) => user.uid !== volunteer.uid)
              .map((user) => {
                return (
                  <li
                    data-aos="zoom-in"
                    onClick={() => {
                      handleSelectUser(user);
                    }}
                    className=" hover:cursor-pointer"
                  >
                    <div className="flex  items-center px-2">
                      <div className="avatar me-4">
                        <div className="w-12 rounded-full">
                          <img src={user.imageRef} />
                        </div>
                      </div>

                      <div>{user.name}</div>
                    </div>

                    <div
                      className=" mx-3 my-3"
                      style={{ border: "1px solid white" }}
                    ></div>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="w-7/12 p-2" style={{ backgroundColor: "#F5F7FE" }}>
          <div>
            {selectedUser ? (
              <div
                style={{
                  width: "100%",
                }}
              >
                <div className="border-b-2 text-center flex items-center px-3">
                  <div className="avatar me-4">
                    <div className="w-12 rounded-full">
                      <img src={selectedUser.imageRef} />
                    </div>
                  </div>
                  <h3 className="py-3 h5 ">
                    <span className="  font-bold text-base-400">
                      {selectedUser.name}
                    </span>
                  </h3>
                </div>

                <div>
                  <ul
                    className="d-flex flex-col p-4   h-[462px]  "
                    style={{ overflowY: "scroll" }}
                  >
                    {messages.map((message, index) => (
                      <li key={index}>
                        {currentUserId === message.sender ? (
                          <div className="chat chat-end">
                            <div className="chat-image avatar">
                              <div className="w-10 rounded-full">
                                <img src={auth.currentUser.photoURL} />
                              </div>
                            </div>
                            <div className="chat-header">
                              {message.senderName}
                            </div>
                            <div className="chat-bubble  bg-amber-200 text-slate-700">
                              {message.text}
                            </div>
                            <time className="text-xs opacity-50">
                              {message.timestamp &&
                                message.timestamp.toDate().toLocaleString()}
                            </time>
                          </div>
                        ) : (
                          <div className="chat chat-start">
                            <div className="chat-image avatar">
                              <div className="w-10 rounded-full">
                                <img src={selectedUser.imageRef} />
                              </div>
                            </div>
                            <div className="chat-header">
                              {selectedUser.name}
                              <time className="text-xs opacity-50"></time>
                            </div>
                            <div className="chat-bubble bg-slate-300 text-slate-600 ">
                              {message.text}
                            </div>
                            <div className="chat-footer opacity-50">
                              {message.timestamp &&
                                message.timestamp.toDate().toLocaleString()}
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                    <div ref={messageEndRef}></div>

                    <div>
                      {showEmojiPicker && (
                        <div className="">
                          <Picker
                            data={data}
                            onEmojiSelect={(emoji) => handleEmojiSelect(emoji)}
                          />
                        </div>
                      )}
                    </div>
                  </ul>
                </div>

                <div className="form-control flex items-center p-2">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-emoji-smile"
                      viewBox="0 0 16 16"
                      className="me-3"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                    </svg>
                    <label for="addFile">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-plus-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                      </svg>
                    </label>
                    <input type="hidden" id="addFile" />
                    <input
                      type="text"
                      placeholder="Enter Messages ...."
                      className="input input-bordered  w-96 ms-3 me-3"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        e.charCode === 13 && handleSendMessage();
                      }}
                    />{" "}
                    <svg
                      onClick={handleSendMessage}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-send"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full min-h-screen flex  justify-center items-center">
                <h2>Select a user to start chatting.</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

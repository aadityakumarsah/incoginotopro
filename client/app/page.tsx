"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Video,
  X,
  SkipForward,
} from "lucide-react";

import Nav from "./components/Nav";

const Home = () => {
  const [status, setStatus] = useState<
    "idle" | "waiting" | "chatting"
  >("idle");

  const [roomId, setRoomId] = useState("");

  const videoContainerRef = useRef<HTMLDivElement>(null);

  const socketRef = useRef<any>(null);

  // Initialize Socket
  useEffect(() => {
    const initSocket = async () => {
      const socketIo = await import("socket.io-client");

      socketRef.current = socketIo.io(
        process.env.NEXT_PUBLIC_SOCKET_URL!,
        {
          transports: ["websocket"],
        }
      );

      socketRef.current.on(
        "matched",
        ({ roomId }: { roomId: string }) => {
          setRoomId(roomId);
          setStatus("chatting");
        }
      );

      socketRef.current.on(
        "partnerDisconnected",
        () => {
          alert(
            "Partner disconnected. Searching for new match..."
          );

          window.location.reload();
        }
      );
    };

    initSocket();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Start Chat
  const startChat = () => {
    socketRef.current?.emit("start");
    setStatus("waiting");
  };

  // Next Chat
  const nextChat = () => {
    window.location.reload();
  };

  // Start Zego Meeting
  useEffect(() => {
    if (
      status !== "chatting" ||
      !roomId ||
      !videoContainerRef.current
    ) {
      return;
    }

    const initMeeting = async () => {
      const { ZegoUIKitPrebuilt } = await import(
        "@zegocloud/zego-uikit-prebuilt"
      );

      const appID = Number(
        process.env.NEXT_PUBLIC_ZEGO_APP_ID
      );

      const serverSecret =
        process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;

      const kitToken =
        ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          Date.now().toString(),
          "Stranger"
        );

      const zp =
        ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: videoContainerRef.current!,

        scenario: {
          mode:
            ZegoUIKitPrebuilt.OneONoneCall,
        },

        showScreenSharingButton: false,
        showPreJoinView: false,

        onLeaveRoom: () => {
          window.location.reload();
        },
      });
    };

    initMeeting();
  }, [status, roomId]);

  return (
    <>
      {status !== "chatting" && <Nav />}

      <main className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050505] text-white flex flex-col">
        {/* Background Glow */}
        <div className="absolute left-[-5%] top-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />

        <div className="absolute bottom-[-5%] right-[-5%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px]" />

        {status === "idle" ||
        status === "waiting" ? (
          <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
              <Sparkles className="h-7 w-7 text-white/90" />
            </div>

            <h1 className="mb-5 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
              Incognito
            </h1>

            <p className="mb-12 max-w-md text-base font-medium leading-relaxed text-gray-400 md:text-lg">
              {status === "waiting"
                ? "Finding someone special for you..."
                : "Anonymous video conversations with strangers worldwide."}
            </p>

            <button
              onClick={startChat}
              disabled={status === "waiting"}
              className="group flex items-center gap-3 rounded-2xl bg-white px-10 py-4 font-bold text-black transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "waiting" ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" />

                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Video className="h-6 w-6 fill-black" />

                  <span>
                    Start Anonymous Chat
                  </span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="relative z-10 flex h-[100dvh] w-full flex-col overflow-hidden">
            <div className="relative flex-1 h-full">
              <div
                ref={videoContainerRef}
                className="h-full w-full zego-container"
              />

              {/* Controls */}
              <div className="absolute top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 w-max">
                <button
                  onClick={() =>
                    window.location.reload()
                  }
                  className="rounded-2xl border border-red-500/50 bg-red-500/20 p-4 backdrop-blur-xl transition-all active:scale-95 hover:bg-red-500/30"
                >
                  <X className="h-6 w-6 text-red-500" />
                </button>

                <button
                  onClick={nextChat}
                  className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-bold backdrop-blur-xl transition-all active:scale-95 hover:bg-white/20"
                >
                  <SkipForward className="h-5 w-5" />

                  <span>Next Person</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Noise Texture */}
        <div className="pointer-events-none absolute inset-0 opacity-20 brightness-50">
          <div className="h-full w-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      </main>
    </>
  );
};

export default Home;
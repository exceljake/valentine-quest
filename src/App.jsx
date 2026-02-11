import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Note: You would need to run `npm install @emailjs/browser` 
import emailjs from '@emailjs/browser';

const App = () => {
  const [stage, setStage] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showItemPop, setShowItemPop] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const persuasion = {
    mangoes: ["EJ: 'They're organic and super sweet!'", "EJ: 'I really can't reach the top ones alone...'", "EJ: 'I'll give you the biggest ones, I promise!'", "EJ: 'It'll be fun, like a mini-adventure!'", "EJ: 'Please? A kind soul like you can't say no...'"],
    heavy: ["EJ: 'My arms are actually shaking right now...'", "EJ: 'It's a long walk to my house from here.'", "EJ: 'I might drop them all and ruin the harvest!'", "EJ: 'Just a little help? You're stronger than you look!'", "EJ: 'I'll share my secret mango recipe if you help!'"],
    valentine: ["EJ: 'I've been thinking about asking you all day...'", "EJ: 'We could have so much fun together!'", "EJ: 'Don't break my pixelated heart now!'", "EJ: 'I promise it'll be the best date ever.'", "EJ: 'Just one chance? I know you'll enjoy it!'"]
  };

  // --- EMAIL FUNCTION ---
 const sendEmail = (date) => {
  setIsSending(true);
  
  // 1. Prepare the variables to match your EmailJS Template
  const templateParams = {
    to_email: 'aedceljake@gmail.com', // The recipient
    message: `It's a date on ${date}. Please dress nicely with black theme. In SM Manila Hotpot, at 1pm`
  };

  // 2. Send the real email
  emailjs.send(
    'service_4f081wo', 
    'template_tbuj1rb', 
    templateParams, 
    'XVFKdvLYojl9YNj7x'
  )
  .then((response) => {
    console.log('SUCCESS!', response.status, response.text);
    setIsSending(false);
    setStage(14); // Move to "The End. See you bb!" only on success
  })
  .catch((err) => {
    console.error('FAILED...', err);
    setIsSending(false);
    // Move to stage 14 anyway so the girl doesn't see an error message
    setStage(14); 
  });
};
  const getBG = () => {
    if (stage <= 3) return "bg-[#5d4037]"; 
    if (stage <= 4) return "bg-[#4a7c44]"; 
    if (stage <= 9) return "bg-[#2d5a27]"; 
    return "bg-[#3e6b39]"; 
  };

  return (
    <div className="fixed inset-0 bg-[#0a1a0a] flex items-center justify-center p-2 font-mono">
      {/* Container is now h-full on mobile to feel like a phone app */}
      <div className={`relative w-full max-w-md h-[90vh] md:aspect-[3/4] border-4 rounded-sm shadow-[0_0_0_4px_#1a3317] overflow-hidden flex flex-col transition-colors duration-700 ${getBG()}`}>
        
        {/* TOP: VISUAL SCENE */}
        <div className="relative h-3/5 w-full overflow-hidden border-b-4 border-[#1a3317]">
          {stage <= 3 && <div className="absolute inset-0 flex items-center justify-around opacity-30 text-5xl"><span>🪑</span><span>🪴</span></div>}
          {stage === 4 && <div className="absolute top-10 left-10 text-6xl opacity-80">🏠</div>}
          {stage >= 5 && stage <= 9 && <div className="absolute top-5 right-1/4 text-7xl">🌳🥭</div>}
          {stage >= 10 && <div className="absolute top-10 right-10 text-5xl opacity-80">🏡</div>}

          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div key="title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/60 z-20 p-4">
                <h1 className="text-2xl mb-6 text-yellow-400 drop-shadow-[2px_2px_0px_#000] leading-tight">WILDWOOD ROMANCE</h1>
                <button onClick={() => setStage(1)} className="bg-[#f0a020] text-white px-6 py-3 border-b-4 border-r-4 border-[#805010] active:translate-y-1">START GAME</button>
              </motion.div>
            )}

            {stage >= 1 && stage <= 13 && (
              <div className="absolute inset-0">
                <div className="absolute bottom-4 w-full px-6 flex justify-between items-end">
                  <motion.div className="relative" animate={{ x: stage >= 5 ? 10 : 0, y: [0, -4, 0] }} transition={{ y: { repeat: Infinity, duration: 0.5 } }}>
                    {stage === 9 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1.2 }} className="absolute -top-10 left-1/2 -translate-x-1/2 text-red-600 font-black text-xl">!!!</motion.div>}
                    <AnimatePresence>
                      {showItemPop && (
                        <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: -50, opacity: 1 }} exit={{ opacity: 0 }} className="absolute -top-10 left-0 w-full text-center text-yellow-300 font-bold text-xs">+3 MANGOES 🥭</motion.div>
                      )}
                    </AnimatePresence>
                    <img src="/girl.png" alt="Rena" className="w-24 object-contain" />
                  </motion.div>

                  {stage >= 5 && (
                    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                      <img src="/boy.png" alt="EJ" className={`w-24 object-contain ${stage === 9 ? 'animate-bounce brightness-90' : ''}`} />
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {stage === 14 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center bg-pink-100/80 text-center p-4">
                <div className="flex gap-2 mb-4">
                  <img src="/girl.png" className="w-16" />
                  <span className="text-3xl">❤️</span>
                  <img src="/boy.png" className="w-16 hue-rotate-[320deg]" />
                </div>
                <h1 className="text-2xl text-pink-600 font-bold mb-2">The End. See you bb!</h1>
                <p className="bg-white px-4 py-2 border-2 border-pink-500 rounded-lg text-pink-600 font-bold text-sm">
                  Marked for {selectedDate} 📅<br/>
                  <span className="text-[10px] opacity-70">Check your email for details!</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM: DIALOGUE BOX */}
        {stage > 0 && stage < 14 && (
          <div className="flex-grow w-full bg-[#1a3317] p-2 flex flex-col">
            <div className="flex-grow bg-white border-4 border-[#4a8a3f] p-3 text-black flex flex-col justify-between">
              <div className="text-sm leading-snug font-semibold overflow-y-auto max-h-32">
                {stage === 1 && "Narrator: Once upon a time, there was a girl named Rena. She is a really kind girl."}
                {stage === 2 && "Rena: 'Hmm, recently life gets boring. It's always in the same routine.'"}
                {stage === 3 && "Rena: 'I know! Maybe there's something to do outside.'"}
                {stage === 4 && "Narrator: Rena steps out of her house and decides to wander into the forest..."}
                {stage === 5 && (noCount === 0 ? "EJ: 'Hi, do you want some mangoes? Help me pick some and I'll give you some.'" : persuasion.mangoes[Math.min(noCount - 1, 4)])}
                {stage === 6 && "EJ: 'Wow! Thanks for your help. Here's 3 mangoes for your kindness!'"}
                {stage === 7 && "Rena: 'Thank you so much!'"}
                {stage === 8 && "EJ: 'Ackkk my back hurts, this sure is heavy!'"}
                {stage === 9 && (noCount === 0 ? "EJ: 'This basket is 20kg... could you help me carry it?'" : persuasion.heavy[Math.min(noCount - 1, 4)])}
                {stage === 10 && "EJ: 'This is my house. I really appreciate your help today.'"}
                {stage === 11 && "Rena: 'No problem, thanks for the mangoes!'"}
                {stage === 12 && (noCount === 0 ? "EJ: 'Wait wait, Valentine's is near. Can I be your date on Valentine's?'" : persuasion.valentine[Math.min(noCount - 1, 4)])}
                {stage === 13 && "EJ: 'Cool! Please pick a date most convenient to you:'"}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 mt-2">
                {isSending ? (
                  <span className="text-pink-500 text-xs animate-pulse">Booking Date...</span>
                ) : [5, 9, 12].includes(stage) ? (
                  <>
                    <button onClick={() => { setStage(stage + 1); setNoCount(0); }} className="text-green-700 font-bold px-2 py-1">YES</button>
                    <button onClick={() => setNoCount(noCount + 1)} className="text-red-600 font-bold px-2 py-1">NO</button>
                  </>
                ) : stage === 13 ? (
                  <div className="grid grid-cols-3 gap-1 w-full">
                    {["Feb 14", "Feb 15", "Feb 17"].map(d => (
                      <button key={d} onClick={() => { setSelectedDate(d); sendEmail(d); }} className="bg-pink-500 text-white py-2 text-[10px] font-bold rounded-sm active:bg-pink-700">{d}</button>
                    ))}
                  </div>
                ) : (
                  <button onClick={() => {
                    if (stage === 6) { setShowItemPop(true); setTimeout(() => setShowItemPop(false), 2000); }
                    setStage(stage + 1);
                  }} className="text-blue-600 font-bold text-sm">CONTINUE ▶</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
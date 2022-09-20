import { useState } from "react";

function Speech({ addLog, userEntities, allEntities, user }) {
  const [speech, setSpeech] = useState({
    entity: user,
    content: "",
    target: "ALL_PLAYERS",
    isHidden: false,
  });
  console.log(speech, "@@@@");
  function update(e) {
    let cloneContent = { ...speech, [e.target.id]: e.target.value };
    console.log(cloneContent, "!!!!!!!");
    setSpeech(cloneContent);
  }

  return (
    <div className="flex flex-col relative w-full sm:w-auto sm:rounded-2xl bg-white dark:bg-gray-800 dark:text-white p-4 pr-8 sm:m-2 sm:shadow-md">
      <div className="pb-2 flex flex-row h-full">
        <select
          id="entity"
          className="text-xs"
          onChange={update}
          value={speech.entity}
        >
          {userEntities.map((entity) => {
            return <option value={entity}>{entity}</option>;
          })}
        </select>
        <div>{"->"}</div>

        <select
          id="target"
          className="text-xs"
          onChange={update}
          value={speech.target}
        >
          {allEntities.map((entity) => {
            return <option value={entity}>{entity}</option>;
          })}
        </select>
      </div>
      <div className="flex flex-row relative w-full sm:w-auto sm:rounded-2xl bg-white  p-4 pr-8 ">
      <textarea
        className="w-11/12 h-full sm:h-8 sm:h-auto text-xs text-purple-500 placeholder-gray-400 rounded bg-transparent pr-1"
        id="content"
        value={speech.content}
        type="text"
        rows="5"
        spellCheck="false"
        placeholder="Say something ... "
        onChange={update}
      />

      <button
        className="absolute sm:h-auto bg-white text-sm text-purple-500 hover:text-purple-600 sm: right-0  right-0"
        onClick={() => addLog(speech.isHidden, speech.content, "speech")}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>

      </div>
    </div>
  );
}

export default Speech;

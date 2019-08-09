import React, { useEffect } from "react";
import useCollection from "./useCollection";
import { db } from "./firebase";

function Members({ channelId }) {
  const members = useCollection("users", undefined);

  // useEffect(() => {
  //   db.collection("users")
  //     .where(`channels.${channelId}`, "==", true)
  //     .onSnapshot(snapshot => {
  //       const docs = [];
  //       snapshot.forEach(doc => {
  //         docs.push({
  //           ...doc.data(),
  //           id: doc.id
  //         });
  //       });

  //       console.log(docs);
  //     });
  // }, []);

  console.log("member =>", members);

  return (
    <div className="Members">
      <div>
        {members.sort(sortByName).map(member => (
          <div key={member.id} className="Member">
            <div className={`MemberStatus ${member.status.state}`} />
            {member.displayName}
          </div>
        ))}
      </div>
    </div>
  );
}

function sortByName(a, b) {
  return a.displayName > b.displayName
    ? 1
    : a.displayName < b.displayName
    ? -1
    : 0;
}

export default Members;

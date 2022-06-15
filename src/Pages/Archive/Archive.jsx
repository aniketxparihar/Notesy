import React, { useEffect, useState } from 'react'
import "./Archive.css"
import { useTheme } from "../../Context/Theme-Context";
import axios from 'axios';
import { useAuth } from '../../Context/Auth-Context';
import ArchivedNoteCard from '../../Components/ArchivedNoteCard/ArchivedNoteCard';
import { useNotes } from '../../Context/Notes-Context';
const Archive = () => {
    const { themeObject } = useTheme();
    const { authToken } = useAuth();
  const { archiveNoteRender } = useNotes();
  const [archivedNotes, setArchivedNotes] = useState([]);
    useEffect(()=>{(async () => {
        try {
            const response =await axios.get("/api/archives", {
              headers: {
                authorization: authToken,
              },
            });
            if(response.status===200&&response.data.archives!==null)
            setArchivedNotes(response.data.archives)
        }
        catch(err) {
            console.log(err);
        }
    })()
    }, [archiveNoteRender])
  
  return (
    <div
      className="archive__container"
      style={{ backgroundColor: themeObject.primary }}
    >
      <div className="archive__notes__container">
        <div className="archive__heading" style={{ color: themeObject.text }}>
          Archived Notes
        </div>
        <div className="archive__notes">
          {archivedNotes.map((note) => {
            return <ArchivedNoteCard key={note._id} data={note} />;
          })}
        </div>
        {archivedNotes.length === 0 ? (
          <h1 className="archive-empty" style={{ color: themeObject.text }}>
            Nothing here yet 🗒...
          </h1>
        ) : null}
      </div>
    </div>
  );
}

export default Archive
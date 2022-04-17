import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./Auth-Context";

const NotesContext = createContext();
const NotesProvider = (props) => {
    const { authToken } = useAuth();
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [newNoteRender, setNewNoteRender] = useState(true);
    const [prioritySort, setPrioritySort] = useState("");
    const [dateSort, setDateSort] = useState("");
    const [searchSort, setSearchSort] = useState("");
    const [tagSort, setTagSort] = useState("");
    const [noteFormVisible, setNoteFormVisible] = useState("none");

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/notes",
                {
                    headers: {
                        authorization: authToken
                    }
                })
            setNotes(response.data.notes);
        })()
    }, [newNoteRender]);
    
    const addNoteHandler = async (note) => {
        try {
            const response = await axios.post("/api/notes",
                { note},
                {
                    headers: {
                        authorization: authToken,
                    }
                }
            )
            setNewNoteRender(!newNoteRender);
        }
        catch (err) {
            console.log(err);
        }
    }
    const editNoteHandler = async (note) => {
        try {
            const response = await axios.post(`/api/notes/${note._id}`,
                { note },
                {
                    headers: {
                        authorization: authToken,
                    }
                }
            )
            console.log(response.data.notes, "This is the New Note")
            setNewNoteRender(!newNoteRender);
        }
        catch (err) {
            console.log(err);
        }
    }
    const archiveNoteHandler = async (note) => {
        try {

            const response = await axios.post(`/api/notes/archives/${note._id}`,
                {
                        note
                },
                {
                    headers: {
                        authorization: authToken,
                    }
                }
            )
            setNewNoteRender(!newNoteRender);
        }
        catch (err) {
            console.log(err);
        }
    }
    const deleteNoteHandler = async (_id) => {
        try {

            const response = await axios.delete(`/api/notes/${_id}`,
                {
                    headers: {
                        authorization: authToken,
                    }
                }
            )
            setNewNoteRender(!newNoteRender);
        }
        catch (err) {
            console.log(err);
        }
    }
    
    return (
        <NotesContext.Provider value={{ archiveNoteHandler, addNoteHandler,deleteNoteHandler,editNoteHandler,notes,setNotes,filteredNotes,setFilteredNotes,setPrioritySort,prioritySort,dateSort,setDateSort,searchSort,setSearchSort,tagSort,setTagSort,noteFormVisible,setNoteFormVisible }}>
            {props.children}
        </NotesContext.Provider>
    )
}

const useNotes = () => useContext(NotesContext);
export { useNotes, NotesProvider };
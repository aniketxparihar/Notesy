import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./Auth-Context";

const NotesContext = createContext();
const NotesProvider = (props) => {
    const { authToken } = useAuth();
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [newNoteRender, setNewNoteRender] = useState(true);
    const [archiveNoteRender, setArchiveNoteRender] = useState(true);
    const [prioritySort, setPrioritySort] = useState("");
    const [dateSort, setDateSort] = useState("");
    const [searchSort, setSearchSort] = useState("");
    const [tagSort, setTagSort] = useState("");
    const [noteFormVisible, setNoteFormVisible] = useState("none");
    const [labelNotes, setLabelNotes] = useState([]);
    useEffect(() => {
        notes.map((note) => note.label.map((label) => {
            setLabelNotes(labelNotes.concat(label))
        }
        ))
    }, [notes]);
    const [trashedNotes, setTrashedNotes] = useState([]);

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
            );
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
    const archiveNoteRestoreHandler = async (_id) => {
        try {
            const response = await axios.post(`/api/archives/restore/${_id}`, {},{
                    headers: {
                        authorization: authToken,
                    }
                }
            )
            setNewNoteRender(!newNoteRender);
            setArchiveNoteRender(!archiveNoteRender);

        }
        catch (err) {
            console.log(err);
        }
    }
    const archiveNoteDeleteHandler = async (_id) => {
        try {
            const response = await axios.delete(`/api/archives/delete/${_id}`,
                {
                    headers: {
                        authorization: authToken,
                    }
                }
            )
            setNewNoteRender(!newNoteRender);
            setArchiveNoteRender(!archiveNoteRender);
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
    const deleteTrashedNoteHandler = async (_id) => {
        try {

            const response = await axios.delete(`/api/trash/delete/${_id}`,
                {
                    headers: {
                        authorization: authToken,
                    }
                }
            )
            setNewNoteRender(!newNoteRender);
            if (response.status === 200)
                setTrashedNotes(response.data.trash);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getTrashNoteHandler = async () => {
        try {
            const response = await axios.get("/api/trash", {
                headers: {
                    authorization: authToken,
                },
            });
            if (response.status === 200 && response.data.trash !== null)
                setTrashedNotes(response.data.trash);
        } catch (err) {
            console.log(err);
        }
    }
    const trashNoteHandler = async (note) => {
        try {

            const response = await axios.post(`/api/notes/trash/${note._id}`,
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
            getTrashNoteHandler()
        }
        catch (err) {
            console.log(err);
        }
    }
    const recoverTrashNoteHandler = async (note) => {
        try {

            const response = await axios.post(`/api/trash/restore/${note._id}`,
                {
                },
                {
                    headers: {
                        authorization: authToken,
                    }
                }
            )
            setNewNoteRender(!newNoteRender);
            getTrashNoteHandler()
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <NotesContext.Provider value={{ archiveNoteHandler, addNoteHandler, deleteNoteHandler, editNoteHandler, notes, setNotes, filteredNotes, setFilteredNotes, setPrioritySort, prioritySort, dateSort, setDateSort, searchSort, setSearchSort, tagSort, setTagSort, noteFormVisible, setNoteFormVisible, archiveNoteDeleteHandler, archiveNoteRestoreHandler, archiveNoteRender, getTrashNoteHandler, trashedNotes, trashNoteHandler, recoverTrashNoteHandler, deleteTrashedNoteHandler,labelNotes,setLabelNotes }}>
            {props.children}
        </NotesContext.Provider>
    )
}

const useNotes = () => useContext(NotesContext);
export { useNotes, NotesProvider };
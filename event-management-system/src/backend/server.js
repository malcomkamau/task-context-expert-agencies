import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 4000;
const DATA_FILE = "./events.json";

app.use(cors());
app.use(express.json());

// Ensure events.json exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

// Helper functions
const readEvents = () => {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    } catch (err) {
        console.error("Error reading events:", err);
        return [];
    }
};

const writeEvents = (events) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2), "utf-8");
    } catch (err) {
        console.error("Error writing events:", err);
    }
};

// Get all events
app.get("/events", (req, res) => {
    try {
        const events = readEvents();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: "Failed to read events" });
    }
});

// Create event
app.post("/events", (req, res) => {
    try {
        const events = readEvents();
        const newEvent = { id: Date.now(), attendees: [], ...req.body };
        events.push(newEvent);
        writeEvents(events);
        res.json(newEvent);
    } catch (err) {
        res.status(500).json({ error: "Failed to create event" });
    }
});

// Update event
app.put("/events/:id", (req, res) => {
    try {
        const events = readEvents();
        const index = events.findIndex(e => e.id == req.params.id);
        if (index === -1) return res.status(404).json({ error: "Event not found" });
        events[index] = { ...events[index], ...req.body };
        writeEvents(events);
        res.json(events[index]);
    } catch (err) {
        res.status(500).json({ error: "Failed to update event" });
    }
});

// Delete event
app.delete("/events/:id", (req, res) => {
    try {
        let events = readEvents();
        events = events.filter(e => e.id != req.params.id);
        writeEvents(events);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete event" });
    }
});

// RSVP
app.post("/events/:id/rsvp", (req, res) => {
    try {
        const events = readEvents();
        const event = events.find(e => e.id == req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });

        event.attendees.push(req.body.userName);
        writeEvents(events);
        res.json({ success: true, attendees: event.attendees });
    } catch (err) {
        res.status(500).json({ error: "Failed to RSVP" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

import React, { useState } from "react";
import { Card, CardContent, Button, TextField, MenuItem, Typography } from '@mui/material';

export default function Questionnaire({ setCity, setAmountToSpend, onSubmit }) {
    const [city, setCityState] = useState("");
    const [groceries, setGroceries] = useState("");
    const [dineOut, setDineOut] = useState("");
    const [goOut, setGoOut] = useState("");
    const [amount, setAmount] = useState("");
    const [submitted, setSubmitted] = useState(false);
    // Variables to hold submitted values
    const [savedCity, setSavedCity] = useState("");
    const [savedGroceries, setSavedGroceries] = useState("");
    const [savedDineOut, setSavedDineOut] = useState("");
    const [savedGoOut, setSavedGoOut] = useState("");
    const [savedAmount, setSavedAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setSavedCity(city);
        setSavedGroceries(groceries);
        setSavedDineOut(dineOut);
        setSavedGoOut(goOut);
        setSavedAmount(amount);
        setSubmitted(true);
        if (typeof setCity === 'function') {
            setCity(city);
        }
        if (typeof setAmountToSpend === 'function') {
            setAmountToSpend(Number(amount) || 0);
        }
        if (typeof onSubmit === 'function') {
            onSubmit(city);
        }
    };

    return (
        <Card style={{ maxWidth: 500, margin: "2rem auto", boxShadow: "0 2px 8px #00c8538e", borderRadius: "32px" }}>
            <CardContent>
                <Typography variant="h5" gutterBottom><b>Questionnaire</b></Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="What is your primary location? (City, State)"
                        value={city}
                        onChange={e => setCityState(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="How much do you typically spend on groceries each week?"
                        value={groceries}
                        onChange={e => setGroceries(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="$0 - $20">$0 - $20</MenuItem>
                        <MenuItem value="$20 - $40">$20 - $40</MenuItem>
                        <MenuItem value="$40 - $80">$40 - $80</MenuItem>
                        <MenuItem value="80+">$80+</MenuItem>
                    </TextField>
                    <TextField
                        select
                        label="How much do you typically spend when you go out to eat?"
                        value={dineOut}
                        onChange={e => setDineOut(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="$0 - $20">$0 - $20</MenuItem>
                        <MenuItem value="$20 - $40">$20 - $40</MenuItem>
                        <MenuItem value="$40 - $80">$40 - $80</MenuItem>
                        <MenuItem value="$80+">$80+</MenuItem>
                    </TextField>
                    <TextField
                        select
                        label="How much do you typically spend when you go out?"
                        value={goOut}
                        onChange={e => setGoOut(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="$0 - $20">$0 - $20</MenuItem>
                        <MenuItem value="$20 - $40">$20 - $40</MenuItem>
                        <MenuItem value="$40 - $80">$40 - $80</MenuItem>
                        <MenuItem value="$80+">$80+</MenuItem>
                    </TextField>
                    <TextField
                        label="How much money do you have to spend?"
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: "1rem" }}>
                        Submit
                    </Button>
                </form>
                {submitted && (
                    <div style={{ marginTop: "1.5rem" }}>
                        <Typography variant="subtitle1">Your Inputs:</Typography>
                        <Typography>City: {savedCity}</Typography>
                        <Typography>Grocery Spend: {savedGroceries}</Typography>
                        <Typography>Amount for Dining Out: {savedDineOut}</Typography>
                        <Typography>Amount for Going Out: {savedGoOut}</Typography>
                        <Typography>Amount to Spend: ${savedAmount}</Typography>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
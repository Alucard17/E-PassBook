import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';
export default function Chart() {
    const [statementsData, setstatementsData] = useState([]);

    const fetchAPIData = async () => {
        let data = await (await fetch("http://starlord.hackerearth.com/bankAccount")).json();
        setstatementsData(data)
    }

    useEffect(() => {
        fetchAPIData()
    }, []);
    const withDrawl = statementsData
        .map(s => s["Withdrawal AMT"].replace(",", ""))
        .filter(s => s != "")
        .reduce((sum, i) => sum + parseFloat(i), 0.0)
        .toFixed(2);

    const Deposit = statementsData
        .map(s => s["Deposit AMT"].replace(",", ""))
        .filter(s => s != "")
        .reduce((sum, i) => sum + parseFloat(i), 0.0)
        .toFixed(2);

    return (
        <Card>
            <CardBody>
                <CardTitle><h1>Pie Chart</h1></CardTitle>
                <CardSubtitle><i>Demo Pie Chart</i></CardSubtitle>
                <hr></hr>
                <Doughnut data={{
                    datasets: [{
                        data: [withDrawl, Deposit],
                        backgroundColor: [
                            '#f19aaa',
                            '#007bff'
                        ]
                    }],
                    labels: ["Withdrawal AMT", "Deposit AMT"]
                }} />
            </CardBody>
        </Card>
    );
}
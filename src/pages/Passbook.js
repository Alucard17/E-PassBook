import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Input
} from 'reactstrap';

function App() {
    const [statementsData, setstatementsData] = useState([]);
    const [selectedPage, setSelectedPage] = useState(1);
    const [search, setSearch] = useState("")

    const fetchAPIData = async () => {
        let data = await (await fetch("http://starlord.hackerearth.com/bankAccount")).json();
        setstatementsData(data)
    }

    useEffect(() => {
        fetchAPIData()
    }, []);

    let filteredData = search ?
        statementsData.filter(s => s["Transaction Details"].toLowerCase().includes(search.toLowerCase()))
        : statementsData;

    const _Paginator = Paginator(filteredData, selectedPage, 10)
    return (
        <Card>
            <CardBody>
                <CardTitle><h1>Passbook</h1></CardTitle>
                <CardSubtitle><i>Your Account Statemaents</i></CardSubtitle>
                <hr></hr>
                <Input
                    value={search}
                    onInput={e => { setSearch(e.target.value); setSelectedPage(1); }}
                    type="text"
                    name="search"
                    placeholder="search"
                    bsSize="lg"
                    className="mb-3" />
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th>Account No</th>
                            <th>Date</th>
                            <th>Transaction Details</th>
                            <th>Value Date</th>
                            <th>Withdrawal AMT</th>
                            <th>Deposit AMT</th>
                            <th>Balance AMT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_Paginator.data.map((statement, i) => (
                            <tr key={i}>
                                <td>{statement["Account No"]}</td>
                                <td>{statement["Date"]}</td>
                                <td>{statement["Transaction Details"]}</td>
                                <td>{statement["Value Date"]}</td>
                                <td>{statement["Withdrawal AMT"]}</td>
                                <td>{statement["Deposit AMT"]}</td>
                                <td>{statement["Balance AMT"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination aria-label="Page navigation example" style={{ 'flex-wrap': "wrap" }}>

                    {
                        [...new Array(_Paginator.total_pages).keys()].map(i =>
                            <PaginationItem key={i} active={i + 1 === selectedPage} onClick={() => setSelectedPage(i + 1)}>
                                <PaginationLink>{i + 1}</PaginationLink>
                            </PaginationItem>
                        )
                    }
                </Pagination>
            </CardBody>
        </Card>
    );
}

function Paginator(items, selectedPage, per_page) {

    const offset = (selectedPage - 1) * per_page;
    selectedPage = selectedPage || 1;
    per_page = per_page || 10;

    const paginatedItems = items.slice(offset).slice(0, per_page);
    const total_pages = Math.ceil(items.length / per_page);
    return {
        page: selectedPage,
        per_page: per_page,
        pre_page: selectedPage - 1 ? selectedPage - 1 : null,
        next_page: (total_pages > selectedPage) ? selectedPage + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}
export default App;

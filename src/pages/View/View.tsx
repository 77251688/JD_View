import React, { useEffect, useState, ReactPortal } from "react";
import ReactDOM from "react-dom";
import { Select } from "antd";
const { Option } = Select;
import axios from "axios";
import HourView from "../HourView/index";
import DayView from "../DayView/index";
import "./index.css";
export default function View() {
    const [userItem, setuserItem] = useState([]);
    const [time, settime] = useState([]);
    const [income, setincome] = useState([]);
    const [day, setday] = useState([]);
    const [dayincome, setdayincome] = useState([]);
    const [node, setnode] = useState<ReactPortal>();
    const onChange = async (v: any) => {
        console.log(v);
        const res_ = await fetch("/getuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([v])
        });
        const dayres_ = await fetch("/userday", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([v])
        });
        const res = await res_.json();
        const dayres = await dayres_.json();
        const min = res[0].data.map(e => e.min);
        const income_ = res[0].data.map(e => e.income);
        settime(min);
        setincome(income_);
        setday(dayres[0].day);
        setdayincome(dayres[0].income);
    };
    useEffect(() => {
        axios.get("/userItem")
            .then((res: any) => {
                const select = (
                    <div className="userItem">
                        <Select
                            showSearch
                            onChange={onChange}
                            placeholder="Select a person"
                            optionFilterProp="children"
                        >
                            {res.data.map(e => {
                                return <Option key={e}>{e}</Option>;
                            })}
                        </Select>
                    </div>
                );
                const container = document.querySelector(".userItem") as Element;
                setnode(ReactDOM.createPortal(select, container));
            });
    }, []);
    return (
        <div className="views" style={{ padding: 0 }}>
            {node}
            <div className="head">
                <div className="hour">
                    <HourView time={time} income={income} />
                </div>
                <div className="day">
                    <DayView day={day} dayincome={dayincome} />
                </div>
            </div>
            <div className="end">
                <div className="week">3</div>
                <div className="month">4</div>
            </div>
        </div>
    );
}

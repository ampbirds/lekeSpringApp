//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useDemoData } from '@mui/x-data-grid-generator';
import Service from '../services/Services';
import Button from '@mui/material/Button';

export default function BatteryData() {
  const [pageSize, setPageSize] = React.useState(5);
  const [data,setBatteryData] = React.useState([]);
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'batteryCode',
      sort: 'asc',
    },
  ]);
  const columns = [
    { field: 'batteryCode', headerName: 'Battery Code', flex: 1  },
    { field: 'batteryVoltage', headerName: 'Battery Voltage' , flex: 1 },
    { field: 'stationName', headerName: 'Station Name' , flex: 1 },
    { field: 'stationUniqueId', headerName: 'Station Id' , flex: 1 },
    { field: 'stationAdd', headerName: 'Station Address', flex: 1  },
  {
    field: 'batteryLevel',
    
    width: 140,
    cellClassName: (params) =>
      clsx('super-app', {
        positive : params.value > 0 && params.value < 1.5,
        orange: params.value > 1.5 && params.value <2.5,
        negative: params.value > 2.5 && params.value<3.5
      }),
      flex: 1 
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation();
        var userId = localStorage.getItem("userId");
        params.row.userId = userId
        console.log(params.row)
        Service.transactionSave(params.row)
      };

      return <Button variant="contained" onClick={onClick}>Book</Button>;
    }
  },
  ];
  var rows=[];
  useEffect(() => {
    Service.getBatteryData().then(res =>{
      console.log("success")
      console.log(res.data)
      setBatteryData(res.data);
  });
   
  },[]);

  
  // const { data } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  return (
    
      <Box
      sx={{
        height: 300,
        width: 1,
        '& .super-app-theme--cell': {
          backgroundColor: 'rgba(224, 183, 60, 0.55)',
          color: '#1a3e72',
          fontWeight: '600',
        },
        '& .super-app.negative': {
          backgroundColor: 'rgba(157, 255, 118, 0.49)',
          color: 'rgba(157, 255, 118, 0.49)',
          fontWeight: '600',
        },
        '& .super-app.positive': {
          backgroundColor: '#d47483',
          color: '#d47483',
          fontWeight: '600',
        },
        '& .super-app.orange': {
          backgroundColor: '#FFA500',
          color: '#FFA500',
          fontWeight: '600',
        },
      }}
    >
      <DataGrid
      style={{height:"700px"}}
      sortModel={sortModel}
      onSortModelChange={(model) => setSortModel(model)}
      components={{ Toolbar: GridToolbar }} 
        columns={columns} rows={data} 
      />
      </Box>
    
  );
}

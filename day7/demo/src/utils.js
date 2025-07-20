export const exportToCSV = (data) => {
    const fileHeaders = [
        'orderId',
        'cName',
        'orderDate',
        'deliveryDate',
        'amount',
        'status',
        'repName',
        'notes',
        'createdBy',
        'createdAt',
        'updatedAt'
    ]

    if(data.length==0){
        alert("No data to export");
        return;
    }

    const headers = fileHeaders.join(',')+'\n';

    const rows = data.map((rowData)=>{
        return fileHeaders.map((field)=>rowData[field] || '').join(',');
    }).join('\n');

    const fullData =  headers+rows;

    if(fullData===''){
        alert("No data to export");
        return;
    }
    else{
        const blob = new Blob([fullData],{ type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download','exported-orders.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

}
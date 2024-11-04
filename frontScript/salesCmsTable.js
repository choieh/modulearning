async function listAct() {
    let lists = '';
    let data = await getCms();
    let code = data.result.code;
    lists += '<table>';
    lists += '<tr class="border-b-2 border-black">';
    // lists += `<td class="w-[50px]">ST01</td>`;
    lists += `<td class="w-[100px]">전략구분</td>`;
    // lists += `<td class="w-[50px]">CT01</td>`;
    lists += `<td class="w-[100px]">계약구분</td>`;
    // lists += `<td class="w-[50px]">CH01</td>`;
    lists += `<td class="w-[100px]">채널구분</td>`;
    lists += `<td class="w-[100px]">발굴자</td>`;
    // lists += `<td class="w-[60px]">직군코드</td>`;
    lists += `<td class="w-[100px]">직군명</td>`;
    lists += `<td class="w-[140px]">발굴자영업 수수료율</td>`;
    lists += `<td class="w-[100px]">영업담당</td>`;
    // lists += `<td class="w-[60px]">직군코드</td>`;
    lists += `<td class="w-[100px]">직군명</td>`;
    lists += `<td class="w-[140px]">영업담당영업 수수료율</td>`;
    lists += '<td class="w-[100px] text-center">등록/수정</td>'
    lists += '</tr>';

    for ( const c of Object.entries(code)) {
        let d = c[1];
        let cms1 = d.cms1 ?? 'NA';
        let cms2 = d.cms2 ?? 'NA';
        lists += '<tr class="border-b border-gary-300">';
        // lists += `<td>${d.s2TypeCode}</td>`;
        lists += `<td>${d.s2TypeName}</td>`;
        // lists += `<td>${d.s3TypeCode}</td>`;
        lists += `<td>${d.s3TypeName}</td>`;
        // lists += `<td>${d.s4TypeCode}</td>`;
        lists += `<td>${d.s4TypeName}</td>`;
        lists += `<td>${d.s5TypeName}</td>`;
        // lists += `<td>${d.s5TypeCode}</td>`;
        lists += `<td>${d.s5Title ?? 'NA'}</td>`;
        lists += `<td><input type="text" value="${cms1}" 
                    name="${d.s2TypeCode}${d.s3TypeCode}${d.s4TypeCode}${d.s5TypeCode}" 
                    class="border border-black w-[120px] pl-1"></td>`;
        lists += `<td>${d.s6TypeName}</td>`;
        // lists += `<td>${d.s6TypeCode}</td>`;
        lists += `<td>${d.s6Title ?? 'NA'}</td>`;
        lists += `<td><input type="text" value="${cms2}"  
                    name="${d.s2TypeCode}${d.s3TypeCode}${d.s4TypeCode}${d.s6TypeCode}" 
                    class="border border-black w-[120px] pl-1"></td>`;
        lists += `<td class="text-center">
            <button type="button" onClick = "saveCms(this)" 
            class="bg-blue-300 text-blue-600 px-2 py-1 w-[80px] rounded-sm">등록/수정</button>
            </td>`;
        lists += '</tr>';
    }
    lists += '</table>';
    document.getElementById('contentsArea').innerHTML = '';
    document.getElementById('contentsArea').insertAdjacentHTML('beforeend', lists);
}

async function getCms() {
    const response = await fetch(useApi, {
        method: 'GET'
    })

    return response.json();
}

function saveCms(element) {
    if (!confirm('수정하시겠습니까?')) return false;

    let tr = element.parentNode.parentNode;
    const inputs = tr.querySelectorAll('input');
    let input1 = inputs[0];
    let input2 = inputs[1];

    let data = `input1Name=${input1.name}&input1=${input1.value}&input2Name=${input2.name}&input2=${input2.value}`;
    fetch(useApi, {
        method: "POST",
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then( (res) => res.json())
        .then( async (data) => {
            if (data.result == 'success') {
                alert('수정됐습니다.');
                await listAct();
            } else {
                alert('오류가 발생했습니다.');
            }
        })

}
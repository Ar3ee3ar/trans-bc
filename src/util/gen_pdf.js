import { jsPDF } from "jspdf";
import QRCodeSVG  from "qrcode.react";
import '../font/Sarabun-Regular-normal'


const thaitext = (doc, x, y,str) => {
    var sara = ['่','้','๊','๋','์'];
    var pushers = ['ิ','ี','ึ', 'ื', 'ำ', 'ั'];
    var base = '';
    var dim = doc.getTextDimensions(str);
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (sara.indexOf(c) < 0) {
            base += c;
        } else {
            var pusher = base.charAt(base.length - 1);
            if (pushers.indexOf(pusher) < 0) {
                if (str.charAt(i+1) != '' && str.charAt(i+1) == "ำ") { // next char is ำ
                    var len = doc.getTextWidth(base + "ำ");
                    doc.text( x + len, y-(dim.h/4),c);
                } else {
                    base += c;
                }
            } else {
                var len = doc.getTextWidth(base);
                doc.text(x + len, y-(dim.h/4),c);
            }
        }
    }
    doc.text(x, y,base);
  };

export const gen_pdf = async (response) =>{
    // console.log('clixk')
    // const response = await getData(std_id);
    const doc = new jsPDF();
    doc.setFont('Sarabun-Regular','normal');
    // doc.addImage(50,20,<QRCodeSVG value={response.data.data[0]._id}/>);
    thaitext(doc,20, 20, 'ชื่อ '+response.data.data[0].std_name);
    thaitext(doc,20, 30, 'นามสกุล '+response.data.data[0].std_last);
    thaitext(doc,20, 40, 'รหัสนักศึกษา '+response.data.data[0]._id);
    thaitext(doc,20, 50, 'วันที่เข้าศึกษา '+response.data.data[0].date_of_ad);
    thaitext(doc,20, 60, 'วันที่จบการศึกษา '+response.data.data[0].date_of_grad);
    var position = 70;
    const course_list = response.data.data[0].course
    const subj_list = response.data.data[0].subj_info
    for (let i=0; i<course_list.length;i++){
        thaitext(doc,20, position, 'รหัสวิชา: '+course_list[i].subj_ID);
        position = position + 10;
        thaitext(doc,20, position, 'วิชา: '+subj_list[i].subj_name);
        position = position + 10;
        thaitext(doc,20, position, 'grade: '+course_list[i].grade_type);
        position = position + 10;
    }

    // doc.save("a4.pdf");
    console.log(doc.output('blob'));
    return doc.output('blob');
}
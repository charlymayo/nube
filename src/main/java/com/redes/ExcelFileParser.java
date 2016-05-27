package com.redes;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import org.json.*;

import java.io.File;
import java.io.IOException;

/**
 * Created by charl on 19/03/2016.
 */
public class ExcelFileParser {
    public static JSONObject parseExcelFile(String fileName){
        JSONObject workbookObject = new JSONObject();
        File inputWorkbook = new File(fileName);
        Workbook workbook;
        Sheet sheet;
        JSONArray sheetsArray;
        JSONObject sheetObject;
        JSONArray rowsArray;
        JSONObject rowObject;
        JSONObject cellObject;
        JSONArray cellsArray;

        try {
            workbook = Workbook.getWorkbook(inputWorkbook);
            sheetsArray = new JSONArray();
            for(int s=0; s<workbook.getNumberOfSheets(); s++) {
                sheet = workbook.getSheet(s);

                rowsArray = new JSONArray();
                for (int r = 0; r < sheet.getRows(); r++) {
                    rowObject = new JSONObject();
                    cellsArray = new JSONArray();
                    for (int c = 0; c < sheet.getColumns(); c++) {
                        cellObject = new JSONObject();
                        cellObject.put("cell" + c, sheet.getCell(c,r).getContents());
                        cellsArray.put(c, cellObject);
                    }
                    rowObject.put("row" + r, cellsArray);
                    rowsArray.put(r, rowObject);
                }
                sheetObject = new JSONObject();
                sheetObject.put("sheet" + s, rowsArray);
                sheetsArray.put(s, sheetObject);
            }
            workbookObject.put("woorkbook", sheetsArray);
        }catch(BiffException | IOException  e){

        }
        return workbookObject;
    }
}

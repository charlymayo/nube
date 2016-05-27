package com.redes;

import com.sun.glass.ui.Application;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.BufferedOutputStream;
import java.io.Console;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by charl on 18/03/2016.
 */

@Controller
public class uploadFileController {

    @RequestMapping(value="/getJson", method = RequestMethod.GET)
    public ResponseEntity<String> getJson() {
        String json = ExcelFileParser.parseExcelFile("tmp.xls").toString();
        return new ResponseEntity<String>(json, HttpStatus.OK);
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {

        if (!file.isEmpty()) {
            try {
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(new File("tmp.xls")));
                FileCopyUtils.copy(file.getInputStream(), stream);
                stream.close();
            }
            catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }

        return new ResponseEntity<String>(HttpStatus.OK);
    }
}

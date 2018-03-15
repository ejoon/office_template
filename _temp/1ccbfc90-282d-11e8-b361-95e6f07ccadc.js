
            var excel, word;
            WScript.Echo("{{key=nihao}}");
            try{
                excel = new ActiveXObject("Excel.Application");
                WScript.Echo("{{key2=haha}}");
                excel.DisplayAlerts = false;
                excel.Visible = false;
                word = new ActiveXObject("Word.Application");
                word.DisplayAlerts = false;
                word.Visible = false;
            }catch(e){
                WScript.Echo("{{error=NO_ENGINE}}");
            }finally{
                excel.Quit();
                word.Quit();
                excel = null;
                word = null;                
            }
        
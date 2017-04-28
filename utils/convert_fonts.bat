setlocal
set FONTFORGE_PATH=c:\Program Files (x86)\FontForgeBuilds
call "%FONTFORGE_PATH%\fontforge.bat" -lang=py -script fontconvert.py ..\fonts-sfd\SchoolLight_UAwords-Regular.sfd -w
copy ..\fonts-sfd\SchoolLight_UAwords-Regular.woff  ..\css\fonts\school.woff /Y
endlocal
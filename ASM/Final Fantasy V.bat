SET asmDir="Applied Asm\"
SET romFile="Final Fantasy V"

FOR /R "%asmDir%" %%s in (*.asm)  DO asar "%%s" %romFile% 
@pause :: uncommment for debugging

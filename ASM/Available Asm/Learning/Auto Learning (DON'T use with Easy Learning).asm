hirom

; Spell will be learned Regardless of Learning ability in use
; $C2/4C87 B9 20 20    LDA $2020,y[$7E:2020] (load ability byte)  
; $C2/4C8A 29 10       AND #$10              (check for learning bit)

org $C24C87  ; replace learning check with jump
jsl $E04FE0
nop

org $E04FE0  ; new learning check function
lda #$10
rtl


; Player can learn blue magic when cast on enemy by control or reflect
org $C24C58  ; original opcode: F0 07       BEQ $07    [$4C61]
db $80       ; changes BEQ to BRA


; Player can learn blue magic when attack misses
; $C2/4C61 A5 0F       LDA $0F    [$00:000F]   
; $C2/4C63 05 0E       ORA $0E    [$00:000E]   
; $C2/4C65 85 0E       STA $0E    [$00:000E]   
; $C2/4C67 F0 71       BEQ $71    [$4CDA]      
org $C24C63
ora #$20


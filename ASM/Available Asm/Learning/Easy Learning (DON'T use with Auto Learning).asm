hirom


; If any character has learning ability, spell will be learned
; Exceptions to learning include: not being in party, some status inflictions, and jumping $10 in 7E201E
; $C2/4C87 B9 20 20    LDA $2020,y[$7E:2020] (load ability byte)  
; $C2/4C8A 29 10       AND #$10              (check for learning bit)

; ASM SETUP

inParty = $7E2000
; if value is 0x40, then character is removed from party

hasLearning = $7E2020

status0 = $7E201A
; 0x80 Wounded
; 0x40 Stone
; 0x20 Toad
; 0x10 Mini
; 0x08 Float
; 0x04 Poison
; 0x02 Zombie
; 0x01 Darkness


status1 = $7E201B
; 0x80 Aging
; 0x40 Sleep
; 0x20 Paralyze
; 0x10 Charm
; 0x08 Berserk
; 0x04 Mute
; 0x02 Image x2
; 0x01 Image x1


status2 = $7E201C
; 0x80 Wall
; 0x40 Armor
; 0x20 Shell
; 0x10 Stop
; 0x08 Haste
; 0x04 Slow
; 0x02 Invulnerable
; 0x01 Regen


status3 = $7E201D
; 0x80 Erased
; 0x40 False Image
; 0x20 Controlled (will only cast Fire Sword)
; 0x10 Countdown
; 0x08 HP Leak
; 0x04 Singing
; 0x02 Critical
; 0x01 Hidden

actionFlags = $7E201E
; 0x10 if jumping

!characterIndexDiff = #$0080

; STATUSES THAT PREVENT LEARNING CAN BE CUSTOMIZED HERE
; The values are little endian, so the 73 in #$7873 is the status0 statuses that block learning, and the 73 is from status 1
!status0And1Check = #$7873  ; Includes: Stone, Toad, Mini, Zombie, Darkness, Sleep, Paralyze, Charm, Berserk
!status2And3Check = #$A410  ; Includes: Stop, Erased, Controlled, Singing


org $C24C87            ; replace learning check with jsl
jsl $E04FE0
nop

;   LEARNING AND STATUS CHECK FUNCTION STARTS HERE
org $E04FE0            ; new learning check function
rep #$20
phx
ldx.w #$0000           ; load x with character index starting value


characterLoop:
lda inParty, x
and #$0040             ; check if out of party
bne loopEnd

lda hasLearning, x     ; check if innate ability learning active
and #$0010
beq loopEnd

lda status0, x         ; also has status1 because rep#$20 makes lda load 2 bytes
and !status0And1Check
bne loopEnd

lda status2, x         ; also has status3 because rep#$20 makes lda load 2 bytes
and !status2And3Check
bne loopEnd

lda actionFlags
and #$0010             ; and jump bit
bne loopEnd



bra learnYes

loopEnd:
txa
cmp #$0180              ; if last character fails, then nobody can learn, so jump to learnNo
beq learnNo

clc
adc !characterIndexDiff ; moves index to next character
tax
bra characterLoop



learnYes:
plx
lda.w #$0010
sep   #$20
rtl

learnNo:
plx
lda.w #$0000
sep   #$20
rtl



; Player can learn blue magic when cast on enemy by control or reflect
org $C24C58  ; default opcode: F0 07       BEQ $07    [$4C61]
db $80       ; changes BEQ to BRA


; Player can learn blue magic when attack misses
; $C2/4C61 A5 0F       LDA $0F    [$00:000F]   
; $C2/4C63 05 0E       ORA $0E    [$00:000E]   
; $C2/4C65 85 0E       STA $0E    [$00:000E]   
; $C2/4C67 F0 71       BEQ $71    [$4CDA]      

org $C24C63
ora #$20


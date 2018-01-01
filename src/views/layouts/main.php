<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-02
    | TIME   : 12:46 AM
    */

    include dirname(__DIR__) . '/elements/header.php';
?>
<body>
<?php
    $this->beginBody();
    echo $content;
?>
<?php
    include dirname(__DIR__) . '/elements/footer.php';
    $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>

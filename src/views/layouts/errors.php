<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-26
    | TIME   : 1:44 AM
    */

    include dirname(__DIR__) . '/elements/errors_header.php';
?>
    <body>
    <?php $this->beginBody() ?>
    <div class="d-flex flex align-items-center h-v info theme">
        <div class="text-center p-5 w-100">
            <h1 class="display-5 my-5">Sorry! the page you are looking for doesn't exist.</h1>
            <p>Go back to <a href="#" class="b-b b-white">home</a> or <a href="#" class="b-b b-white">contact us</a>
                about a problem.</p>
            <p class="my-5 text-muted h4">
                -- 404 --
            </p>
        </div>
    </div>
    <?php $this->endBody() ?>
    </body>
    </html>
<?php $this->endPage() ?>
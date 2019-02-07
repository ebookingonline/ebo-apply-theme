<?php
    /** @var \Smart\Base\View $this */

    include dirname(__DIR__) . '/elements/header.php';
?>
    <body>
    <div class="app">
        <?php $this->beginBody() ?>


        <!-- body start -->
        <div id="content" class="app-content box-shadow-0" role="main">
            <!-- Main -->
            <div class="content-main " id="content-main">
                <div class="p-2">
                    <div><?= $this->render('/layout/content/before'); ?></div>
                    <?= $content; ?>
                </div>
            </div>
        </div>
    </div>
    <!-- body end -->
    <?php $this->endBody() ?>
    </body>
    </html>
<?php $this->endPage() ?>
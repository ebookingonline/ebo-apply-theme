<?php
    /*
    | Author : Ata amini
    | Email  : ata.aminie@gmail.com
    | Date   : 2018-01-02
    | TIME   : 12:46 AM
    */

    /** @var \Smart\Base\View $this */

    include dirname(__DIR__) . '/elements/header.php';
?>
    <body>
    <div class="app">
        <?php $this->beginBody() ?>
        <div id="aside" class="app-aside fade box-shadow-x nav-expand white" aria-hidden="true">
            <div class="sidenav modal-dialog dk dark" ui-class="dark">
                <!-- sidenav top -->
                <div class="navbar lt dark" ui-class="dark">
                    <!-- brand -->
                    <a href="<?= $homeUrl; ?>" class="navbar-brand">

                        <img src="<?= $themeUrl; ?>/images/paperplane.svg" alt=".">
                        <span class="hidden-folded d-inline"><?= Yii::$app->name; ?></span>
                    </a>
                    <!-- / brand -->
                </div>

                <!-- Flex nav content -->
                <div class="flex hide-scroll">
                    <div class="scroll">
                        <div class="nav-border b-primary" data-nav="">
                            <ul class="nav bg">
                                <?= $this->render('/layout/navigation/sidebar-menu'); ?>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- body start -->
        <div id="content" class="app-content box-shadow-0" role="main">
            <!-- Header -->
            <?php /*<div class="content-header white  box-shadow-0" id="content-header">
                <div class="navbar navbar-expand-lg">
                    <!-- btn to toggle sidenav on small screen -->
                    <a class="d-lg-none mx-2" data-toggle="modal" data-target="#aside"
                       data-pjax-click-state="external">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                            <path d="M80 304h352v16H80zM80 248h352v16H80zM80 192h352v16H80z"></path>
                        </svg>
                    </a>
                    <!-- Page title -->
                    <div class="navbar-text nav-title flex" id="pageTitle"><?= $this->title; ?></div>
                    <ul class="nav flex-row order-lg-2">
                        <?= $this->render('/layout/navigation/shortcuts'); ?>
                    </ul>
                </div>
            </div> */?>
            <!-- Main -->
            <div class="content-main " id="content-main">
                    <div><?= $this->render('/layout/content/before'); ?></div>
                    <?= $content; ?>
            </div>
        </div>
    </div>
    <!-- body end -->
    <?php $this->endBody() ?>
    </body>
    </html>
<?php $this->endPage() ?>
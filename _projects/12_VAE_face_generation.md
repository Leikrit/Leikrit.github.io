---
layout: page
title: Face Generation
description: A VAE-based Simpsons' faces generation method.
img: assets/img/VAE2.png
importance: 2
category: LMH
related_publications: false
---

This project was completed by myself.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/VAE1.png" title="example image" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Figure 1. Original images.
</div>

### Variational Autoencoder (VAE)

VAE is a method that combines the advantages of Bayes Method and Deep Learning. VAEs are appealing because they are built on top of standard function approximators (neural networks), and can be trained with stochastic gradient descent. VAEs have already shown promise in generating many kinds of complicated data, including handwritten digits, faces, house numbers, CIFAR images, physical models of scenes, segmentation, and predicting the future from static images.

In this project, VAE is used to generate Simpsons' faces. Similar to Autoencoder, VAE only show the difference in the latent process. Precisely, VAE will add some noise to the latent, so that the output will be slightly different from the input. However, if the VAE is not well-trained, the images will be blury. This is a drawback of using too much deconvolution that causes the reduction of sharpness.

#### Model Structure

```Python
class VAE(nn.Module):
    def __init__(self, zsize):
        super(VAE, self).__init__()

        self.zsize = zsize

        # Encoder
        self.conv1 = nn.Conv2d(3, 128, 4, 2, 1) # The kernel size is 4 in order to fit the shape of the image (128*128), each time the width and height will be cut in half.
        self.conv1_bn = nn.BatchNorm2d(128)
        self.conv2 = nn.Conv2d(128, 256, 4, 2, 1)
        self.conv2_bn = nn.BatchNorm2d(256)
        self.conv3 = nn.Conv2d(256, 512, 4, 2, 1)
        self.conv3_bn = nn.BatchNorm2d(512)
        self.conv4 = nn.Conv2d(512, 1024, 4, 2, 1)
        self.conv4_bn = nn.BatchNorm2d(1024)
        self.conv5 = nn.Conv2d(1024, 2048, 4, 2, 1)
        self.conv5_bn = nn.BatchNorm2d(2048)

        self.fc1 = nn.Linear(2048 * 4 * 4, zsize) # Fully Connected Layer
        self.fc2 = nn.Linear(2048 * 4 * 4, zsize)

        # Decoder
        self.d1 = nn.Linear(zsize, 2048 * 4 * 4)
        self.deconv1 = nn.ConvTranspose2d(2048, 1024, 4, 2, 1)
        self.deconv1_bn = nn.BatchNorm2d(1024)
        self.deconv2 = nn.ConvTranspose2d(1024, 512, 4, 2, 1)
        self.deconv2_bn = nn.BatchNorm2d(512)
        self.deconv3 = nn.ConvTranspose2d(512, 256, 4, 2, 1)
        self.deconv3_bn = nn.BatchNorm2d(256)
        self.deconv4 = nn.ConvTranspose2d(256, 128, 4, 2, 1)
        self.deconv4_bn = nn.BatchNorm2d(128)
        self.deconv5 = nn.ConvTranspose2d(128, 3, 4, 2, 1)

    def encode(self, x):
        x = F.relu(self.conv1_bn(self.conv1(x)))
        x = F.relu(self.conv2_bn(self.conv2(x)))
        x = F.relu(self.conv3_bn(self.conv3(x)))
        x = F.relu(self.conv4_bn(self.conv4(x)))
        x = F.relu(self.conv5_bn(self.conv5(x)))
        x = x.view(x.shape[0], 2048 * 4 * 4)
        h1 = self.fc1(x)
        h2 = self.fc2(x)
        return h1, h2

    def reparameterize(self, mu, logvar):
        if self.training:
            std = torch.exp(0.5 * logvar)
            eps = torch.randn_like(std)
            return eps.mul(std).add_(mu)
        else:
            return mu

    def decode(self, x):
        x = x.view(x.shape[0], self.zsize)
        x = self.d1(x)
        x = x.view(x.shape[0], 2048, 4, 4)
        x = F.leaky_relu(x, 0.2)
        x = F.leaky_relu(self.deconv1_bn(self.deconv1(x)), 0.2)
        x = F.leaky_relu(self.deconv2_bn(self.deconv2(x)), 0.2)
        x = F.leaky_relu(self.deconv3_bn(self.deconv3(x)), 0.2)
        x = F.leaky_relu(self.deconv4_bn(self.deconv4(x)), 0.2)
        x = torch.tanh(self.deconv5(x))
        return x

    def forward(self, x):
        mu, logvar = self.encode(x)
        mu = mu.squeeze()
        logvar = logvar.squeeze()
        z = self.reparameterize(mu, logvar)
        return self.decode(z.view(-1, self.zsize, 1, 1)), mu, logvar

    def weight_init(self, mean, std):
        for m in self.modules():
            if isinstance(m, nn.ConvTranspose2d) or isinstance(m, nn.Conv2d):
                m.weight.data.normal_(mean, std)
                m.bias.data.zero_()
```

### Result

Final results of faces generated are shown as below:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/VAE2.png" title="example image" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Figure 2. Generation Results.
</div>

Interestingly, the results are all seemed blurry. That is caused by the convoluntion process in the decoder, which will blur the edges of images.

For more information, see the work in my <a href='https://github.com/Leikrit/LMH_Summer_Programme/tree/main/VAE'>github repository</a>!

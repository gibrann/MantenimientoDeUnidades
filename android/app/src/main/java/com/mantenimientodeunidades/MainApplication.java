package com.mantenimientodeunidades;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNTextInputMask.RNTextInputMaskPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.rssignaturecapture.RSSignatureCapturePackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.rssignaturecapture.RSSignatureCapturePackage;

import java.util.Arrays;
import java.util.List;

import org.pgsqlite.SQLitePluginPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RNTextInputMaskPackage(),
            new RNSpinkitPackage(),
            new RSSignatureCapturePackage(),
                    new PickerPackage(),
                    new SQLitePluginPackage(),
                    new RSSignatureCapturePackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
